import tkinter as tk
from tkinter import ttk, messagebox, Spinbox
import requests
import time
import logging
import subprocess
from concurrent.futures import ThreadPoolExecutor
import psutil
import re
from threading import Lock


# 配置日志记录
logging.basicConfig(filename='download_manager.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class DownloadTask:
    def __init__(self, url, output_path, ffmpeg_command, max_retries, selected_resolution=0):
        self.url = url
        self.output_path = output_path
        self.ffmpeg_command = ffmpeg_command
        self.process = None
        self.downloaded_size = 0
        self.total_size = 0
        self.is_paused = False
        self.is_cancelled = False
        self.is_completed = False
        self.lock = Lock()
        self.last_downloaded_size = 0
        self.last_time = time.time()
        self.download_speed = 0
        self.remaining_time = 0
        self.retry_count = 0
        self.max_retries = max_retries  # 最大重试次数
        self.selected_resolution = selected_resolution
        self.retry_intervals = {
            requests.exceptions.ConnectionError: 5,  # 连接错误重试间隔 5 秒
            requests.exceptions.Timeout: 10,  # 超时错误重试间隔 10 秒
            requests.exceptions.RequestException: 3  # 其他请求错误重试间隔 3 秒
        }
        self.ts_urls = []
        self.ts_files = []
        self.ts_progress = {}  # 存储每个 ts 文件的下载进度

    def download(self):
        try:
            if self.url.endswith('.m3u8'):
                self.download_m3u8()
            else:
                self.download_other()
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout, requests.exceptions.RequestException) as e:
            self.retry_count += 1
            interval = self.retry_intervals.get(type(e), 3)  # 获取对应错误类型的重试间隔
            logging.warning(f"下载文件时出错 (重试 {self.retry_count}/{self.max_retries}): {e}")
            if self.retry_count >= self.max_retries:
                messagebox.showerror("下载错误", f"下载文件时出错: {e}")
                logging.error(f"下载文件时出错: {e}")
                return
            time.sleep(interval)  # 按错误类型设置的重试间隔
            self.download()  # 重试

    def download_m3u8(self):
        m3u8_content = self.get_m3u8_content()
        self.ts_urls = self.parse_m3u8(m3u8_content)
        # return
        self.total_size = self.calculate_total_size(self.ts_urls)  # 计算总大小
        self.download_ts_files()
        print(f"下载完成 {self.url} 的所有 ts 文件")
        self.merge_ts_files()
        print(f"合并完成 {self.url} 的所有 ts 文件")
        self.is_completed = True
        logging.info(f"m3u8 视频流已成功下载到 {self.output_path}")

    def download_other(self):
        headers = {}
        if self.downloaded_size > 0:
            headers['Range'] = f'bytes={self.downloaded_size}-'
        response = requests.get(self.url, stream=True, headers=headers)
        if self.downloaded_size == 0:
            self.total_size = int(response.headers.get('content-length', 0))
        with open(self.output_path, 'ab' if self.downloaded_size > 0 else 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                with self.lock:
                    if self.is_cancelled:
                        logging.info(f"任务已取消: {self.url}")
                        return
                    if self.is_paused:
                        continue
                    file.write(chunk)
                    self.downloaded_size += len(chunk)
                    self.update_speed_and_time()
        self.is_completed = True
        logging.info(f"文件已成功下载到 {self.output_path}")

    def get_m3u8_content(self):
        response = requests.get(self.url)
        response.raise_for_status()
        return response.text
    def parse_m3u8(self, m3u8_content):
        base_url = self.url[:self.url.rfind('/') + 1]
        ts_urls = []
        lines = m3u8_content.splitlines()
        selected_resolution_url = None
        for line in lines:
            if line.startswith('#EXT-X-STREAM-INF'):
                # 解析分辨率信息
                match = re.search(r'RESOLUTION=\d+x(\d+)', line)
                if match:
                    print(match.group(1))
                    resolution = int(match.group(1))
                    if self.selected_resolution == resolution or self.selected_resolution == 0:
                        # 假设下一行是对应的播放列表 URL
                        next_index = lines.index(line) + 1
                        if next_index < len(lines):
                            selected_resolution_url = lines[next_index]
                            break
            elif not line.startswith('#'):
                if not line.startswith('http'):
                    ts_urls.append(base_url + line)
                else:
                    ts_urls.append(line)
        if selected_resolution_url:
            if not selected_resolution_url.startswith('http'):
                selected_resolution_url = base_url + selected_resolution_url
            print(f"解析到分辨率为 {self.selected_resolution} 的播放列表: {selected_resolution_url}")
            response = requests.get(selected_resolution_url)
            response.raise_for_status()
            sub_m3u8_content = response.text
            sub_lines = sub_m3u8_content.splitlines()
            ts_urls = []
            for sub_line in sub_lines:
                if not sub_line.startswith('#'):
                    if not sub_line.startswith('http'):
                        ts_urls.append(base_url + sub_line)
                    else:
                        ts_urls.append(sub_line)
        print(f"解析到 {len(ts_urls)} 个 ts 文件")
        print(ts_urls)
        return ts_urls
    # def parse_m3u8(self, m3u8_content):
    #     base_url = self.url[:self.url.rfind('/') + 1]
    #     ts_urls = []
    #     lines = m3u8_content.splitlines()
    #     for line in lines:
    #         if not line.startswith('#'):
    #             if not line.startswith('http'):
    #                 ts_urls.append(base_url + line)
    #             else:
    #                 ts_urls.append(line)
    #     print(f"解析到 {len(ts_urls)} 个 ts 文件")
    #     print(ts_urls)
    #     return ts_urls

    def download_ts_files(self):
        def download_ts_file(ts_url):
            file_name = f'{self.output_path}_{ts_url.split("/")[-1]}'
            start_byte = self.get_start_byte(file_name)
            headers = {'Range': f'bytes={start_byte}-'} if start_byte > 0 else {}
            try:
                response = requests.get(ts_url, stream=True, headers=headers)
                response.raise_for_status()
                total_size = int(response.headers.get('content-length', 0))
                self.ts_progress[ts_url] = start_byte  # 初始化或更新进度
                print(f"下载 {ts_url} 到 {file_name} 大小:{self.total_size}")
                with open(file_name, 'ab' if start_byte > 0 else 'wb') as file:
                    for chunk in response.iter_content(chunk_size=8192):
                        with self.lock:
                            if self.is_cancelled:
                                logging.info(f"任务已取消: {self.url}")
                                return
                            if self.is_paused:
                                continue
                            file.write(chunk)
                            self.ts_progress[ts_url] += len(chunk)  # 更新单个文件的下载进度
                            self.downloaded_size += len(chunk)  # 更新整体下载进度
                            self.update_speed_and_time()
            except requests.RequestException as e:
                logging.error(f"下载 ts 文件时出错: {e}")
                messagebox.showerror("下载错误", f"下载 ts 文件时出错: {e}")
                if self.retry_count < self.max_retries:
                    self.retry_count += 1
                    self.download_ts_files()  # 重试

        with ThreadPoolExecutor() as executor:
            futures = [executor.submit(download_ts_file, ts_url) for ts_url in self.ts_urls]
            for future in futures:
                future.result()  # 等待所有任务完成

    def merge_ts_files(self):
        with open(self.output_path, 'wb') as outfile:
            for ts_file in self.ts_files:
                with open(ts_file, 'rb') as infile:
                    outfile.write(infile.read(8192))  # 分段读取和写入，避免大文件内存占用过高

    def calculate_total_size(self, ts_urls):
        total_size = 0
        for ts_url in ts_urls:
            response = requests.head(ts_url)
            response.raise_for_status()
            total_size += int(response.headers.get('content-length', 0))
        return total_size

    def update_speed_and_time(self):
        current_time = time.time()
        time_diff = current_time - self.last_time
        if time_diff > 0:
            self.download_speed = (self.downloaded_size - self.last_downloaded_size) / time_diff
            self.remaining_time = (self.total_size - self.downloaded_size) / self.download_speed if self.download_speed > 0 else 0
            self.last_downloaded_size = self.downloaded_size
            self.last_time = current_time
            # 这里添加更新下载状态的逻辑
            self.update_status()

    def update_status(self):
        status = '已完成' if self.is_completed else '已取消' if self.is_cancelled else '已暂停' if self.is_paused else '正在下载'
        progress = f'{int(self.downloaded_size / self.total_size * 100)}%' if self.total_size > 0 else '0%'
        speed = f'{self.download_speed / 1024:.2f} KB/s' if self.download_speed > 0 else '0 KB/s'
        remaining_time = f'{self.remaining_time:.2f} s' if self.remaining_time > 0 else 'N/A'
        DownloadManager.update_task_status(self, status, progress, speed, remaining_time)

    def pause(self):
        with self.lock:
            self.is_paused = True
            logging.info(f"任务已暂停: {self.url}")
            self.update_status()

    def resume(self):
        with self.lock:
            self.is_paused = False
            logging.info(f"任务已恢复: {self.url}")
            self.last_time = time.time()
            self.update_status()

    def cancel(self):
        with self.lock:
            self.is_cancelled = True
            logging.info(f"任务已取消: {self.url}")
            self.update_status()

    def get_start_byte(self, file_name):
        try:
            with open(file_name, 'rb') as file:
                file.seek(0, 2)  # 移动到文件末尾
                return file.tell()  # 返回当前位置，即文件大小
        except FileNotFoundError:
            return 0


class DownloadManager:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
    def __init__(self, root):
        self.root = root
        self.root.title("高级下载管理器")
        self.root.geometry("800x600")
        self.root.configure(bg='#F0F0F0')
        self.tasks = []
        self.executor = None
        self.set_thread_pool_size()  # 初始化线程池

        # 创建并放置 GUI 元素
        input_frame = tk.Frame(self.root, bg='#F0F0F0')
        input_frame.pack(pady=10)

        self.url_label = tk.Label(input_frame, text="URL:", bg='#F0F0F0', font=('Arial', 12))
        self.url_label.grid(row=0, column=0, padx=5)
        self.url_entry = tk.Entry(input_frame, font=('Arial', 12))
        self.url_entry.grid(row=0, column=1, padx=5)

        self.output_path_label = tk.Label(input_frame, text="输出路径:", bg='#F0F0F0', font=('Arial', 12))
        self.output_path_label.grid(row=1, column=0, padx=5)
        self.output_path_entry = tk.Entry(input_frame, font=('Arial', 12))
        self.output_path_entry.grid(row=1, column=1, padx=5)

        self.ffmpeg_command_label = tk.Label(input_frame, text="ffmpeg 命令:", bg='#F0F0F0', font=('Arial', 12))
        self.ffmpeg_command_label.grid(row=2, column=0, padx=5)
        self.ffmpeg_command_entry = tk.Entry(input_frame, font=('Arial', 12))
        self.ffmpeg_command_entry.grid(row=2, column=1, padx=5)

        self.max_retries_label = tk.Label(input_frame, text="最大重试次数:", bg='#F0F0F0', font=('Arial', 12))
        self.max_retries_label.grid(row=3, column=0, padx=5)
        self.max_retries_spinbox = Spinbox(input_frame, from_=0, to=10, font=('Arial', 12))
        self.max_retries_spinbox.grid(row=3, column=1, padx=5)

        self.add_task_button = tk.Button(input_frame, text="添加任务", command=self.add_task, font=('Arial', 12), bg='#4CAF50', fg='white')
        self.add_task_button.grid(row=4, columnspan=2, pady=10)
        self.resolution_label = tk.Label(input_frame, text="分辨率:", bg='#F0F0F0', font=('Arial', 12))
        self.resolution_label.grid(row=5, column=0, padx=5)
        self.resolution_combobox = ttk.Combobox(input_frame, values=['1280x720', '320x184'], font=('Arial', 12))
        self.resolution_combobox.grid(row=5, column=1, padx=5,)
        self.resolution_combobox.current(0)
        
        self.task_frame = tk.Frame(self.root, bg='#F0F0F0')
        self.task_frame.pack(pady=10, fill=tk.BOTH, expand=True)
        self.task_scrollbar = ttk.Scrollbar(self.task_frame)
        self.task_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.task_list = ttk.Treeview(self.task_frame, columns=('URL', '状态', '进度', '下载速度', '剩余时间'), show='headings', yscrollcommand=self.task_scrollbar.set)
        self.task_list.heading('URL', text='URL')
        self.task_list.heading('状态', text='状态')
        self.task_list.heading('进度', text='进度')
        self.task_list.heading('下载速度', text='下载速度')
        self.task_list.heading('剩余时间', text='剩余时间')
        self.task_list.column('URL', width=300)
        self.task_list.column('状态', width=100)
        self.task_list.column('进度', width=200)
        self.task_list.column('下载速度', width=100)
        self.task_list.column('剩余时间', width=100)
        self.task_list.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.task_scrollbar.config(command=self.task_list.yview)

        self.start_all_button = tk.Button(self.root, text="开始所有任务", command=self.start_all_tasks, font=('Arial', 12), bg='#008CBA', fg='white')
        self.start_all_button.pack(pady=10)
        self.pause_all_button = tk.Button(self.root, text="暂停所有任务", command=self.pause_all_tasks, font=('Arial', 12), bg='#FFC107', fg='black')
        self.pause_all_button.pack(pady=10)
        self.resume_all_button = tk.Button(self.root, text="恢复所有任务", command=self.resume_all_tasks, font=('Arial', 12), bg='#FFC107', fg='black')
        self.resume_all_button.pack(pady=10)
        self.cancel_all_button = tk.Button(self.root, text="取消所有任务", command=self.cancel_all_tasks, font=('Arial', 12), bg='#F44336', fg='white')
        self.cancel_all_button.pack(pady=10)

        # 绑定快捷键
        root.bind('<Control-p>', lambda event: self.pause_all_tasks())
        root.bind('<Control-c>', lambda event: self.cancel_all_tasks())

    def set_thread_pool_size(self):
        cpu_count = psutil.cpu_count(logical=False)
        mem = psutil.virtual_memory()
        if mem.available > 2 * 1024**3:  # 可用内存大于 2GB
            self.executor = ThreadPoolExecutor(max_workers=cpu_count * 2)
        else:
            self.executor = ThreadPoolExecutor(max_workers=cpu_count)

    def add_task(self):
        url = self.url_entry.get()
        if self.output_path_entry.get():
            output_path = self.output_path_entry.get() 
        else:
            pattern = re.compile(r"[/\.]")
            parts = re.split(pattern, url)
            output_path = "./" + parts[-2] + ".mp4"
        if self.ffmpeg_command_entry.get():
            ffmpeg_command = self.ffmpeg_command_entry.get().split()
        else:
            ffmpeg_command = f"-i {url} -c copy -bsf:a aac_adtstoasc -timeout 3000000 output.mp4"
        if self.max_retries_spinbox.get():
            max_retries = int(self.max_retries_spinbox.get())
            selected_resolution = self.resolution_combobox.get()
            match = re.search(r'\d+x(\d+)', selected_resolution)
            selected_resolution_i = int(match.group(1))
        else:
            selected_resolution_i = 0
        if url and output_path and ffmpeg_command:
            task = DownloadTask(url, output_path, ffmpeg_command, max_retries, selected_resolution_i)
            self.tasks.append(task)
            self.add_task_to_list(task)
            self.url_entry.delete(0, tk.END)
            self.output_path_entry.delete(0, tk.END)
            self.ffmpeg_command_entry.delete(0, tk.END)
        else:
            messagebox.showwarning("输入错误", "请输入有效的 URL、输出路径和 ffmpeg 命令。")

    def add_task_to_list(self, task):
        index = len(self.tasks)
        self.task_list.insert('', index, values=(task.url, '未开始', '0%', '0 KB/s', 'N/A'))
        task.index = index

    def start_all_tasks(self):
        for task in self.tasks:
            if not task.is_completed and not task.is_cancelled:
                self.executor.submit(self.download_task_with_progress, task)

    def pause_all_tasks(self):
        for task in self.tasks:
            task.pause()
        self.update_buttons_state()
        messagebox.showinfo("操作完成", "所有任务已暂停")

    def resume_all_tasks(self):
        for task in self.tasks:
            task.resume()
        self.update_buttons_state()
        messagebox.showinfo("操作完成", "所有任务已恢复")

    def cancel_all_tasks(self):
        for task in self.tasks:
            task.cancel()
        self.update_buttons_state()
        messagebox.showinfo("操作完成", "所有任务已取消")

    def download_task_with_progress(self, task):
        task.download()
        if not task.is_cancelled:
            try:
                subprocess.run(task.ffmpeg_command, check=True)
                messagebox.showinfo("操作完成", f"ffmpeg 处理已完成: {task.output_path}")
            except subprocess.CalledProcessError as e:
                logging.error(f"ffmpeg 调用错误: {e}")
                messagebox.showerror("ffmpeg 错误", f"ffmpeg 调用错误: {e}")
        self.update_task_status(task)
        self.update_buttons_state()

    @staticmethod
    def update_task_status(task, status, progress, speed, remaining_time):
        index = task.index
        task_list = DownloadManager.get_task_list()
        task_list.item(index, values=(task.url, status, progress, speed, remaining_time))

    @staticmethod
    def get_task_list():
        return DownloadManager.get_instance().task_list

    @staticmethod
    def get_instance():
        if not DownloadManager._instance:
            raise Exception("DownloadManager not initialized")
        return DownloadManager._instance
if __name__ == "__main__":
    root = tk.Tk()
    app = DownloadManager(root)
    root.mainloop()
