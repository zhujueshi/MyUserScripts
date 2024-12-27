import tkinter as tk
from tkinter import ttk, messagebox
import requests
import subprocess
import threading
import logging


# 配置日志记录
logging.basicConfig(filename='download_manager.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class DownloadTask:
    def __init__(self, url, output_path, ffmpeg_command):
        self.url = url
        self.output_path = output_path
        self.ffmpeg_command = ffmpeg_command
        self.process = None
        self.downloaded_size = 0
        self.total_size = 0
        self.is_paused = False
        self.is_cancelled = False
        self.lock = threading.Lock()

    def download(self):
        try:
            response = requests.get(self.url, stream=True)
            response.raise_for_status()
            self.total_size = int(response.headers.get('content-length', 0))
            with open(self.output_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=8192):
                    with self.lock:
                        if self.is_cancelled:
                            logging.info(f"任务已取消: {self.url}")
                            return
                        if self.is_paused:
                            continue
                        file.write(chunk)
                        self.downloaded_size += len(chunk)
                        logging.info(f"已下载 {self.downloaded_size} 字节到 {self.output_path}")
            logging.info(f"文件已成功下载到 {self.output_path}")
        except requests.RequestException as e:
            logging.error(f"下载文件时出错: {e}")
            messagebox.showerror("下载错误", f"下载文件时出错: {e}")
        except IOError as e:
            logging.error(f"文件操作错误: {e}")
            messagebox.showerror("文件操作错误", f"文件操作错误: {e}")

    def pause(self):
        with self.lock:
            self.is_paused = True
            logging.info(f"任务已暂停: {self.url}")

    def resume(self):
        with self.lock:
            self.is_paused = False
            logging.info(f"任务已恢复: {self.url}")

    def cancel(self):
        with self.lock:
            self.is_cancelled = True
            logging.info(f"任务已取消: {self.url}")


class DownloadManager:
    def __init__(self, root):
        self.root = root
        self.root.title("下载管理器")
        self.root.geometry("600x400")  # 设置窗口大小
        self.root.configure(bg='#F0F0F0')  # 设置窗口背景颜色
        self.tasks = []

        # 创建并放置 GUI 元素
        input_frame = tk.Frame(self.root, bg='#F0F0F0')  # 输入区域的框架
        input_frame.pack(pady=10)

        self.url_label = tk.Label(input_frame, text="URL:", bg='#F0F0F0', font=('Arial', 12))  # 调整字体和背景颜色
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

        self.add_task_button = tk.Button(input_frame, text="添加任务", command=self.add_task, font=('Arial', 12), bg='#4CAF50', fg='white')  # 按钮样式优化
        self.add_task_button.grid(row=3, columnspan=2, pady=10)

        self.task_frame = tk.Frame(self.root, bg='#F0F0F0')  # 任务列表区域的框架
        self.task_frame.pack(pady=10)

        self.start_all_button = tk.Button(self.root, text="开始所有任务", command=self.start_all_tasks, font=('Arial', 12), bg='#008CBA', fg='white')  # 按钮样式优化
        self.start_all_button.pack(pady=10)

    def add_task(self):
        url = self.url_entry.get()
        output_path = self.output_path_entry.get()
        ffmpeg_command = self.ffmpeg_command_entry.get().split()
        if url and output_path and ffmpeg_command:
            task = DownloadTask(url, output_path, ffmpeg_command)
            self.tasks.append(task)
            self.add_task_to_list(task)
            self.url_entry.delete(0, tk.END)
            self.output_path_entry.delete(0, tk.END)
            self.ffmpeg_command_entry.delete(0, tk.END)
        else:
            messagebox.showwarning("输入错误", "请输入有效的 URL、输出路径和 ffmpeg 命令。")

    def add_task_to_list(self, task):
        task_frame = tk.Frame(self.task_frame, bg='#F0F0F0')  # 任务项的框架
        task_frame.pack(side=tk.TOP, pady=5)
        task_label = tk.Label(task_frame, text=f"URL: {task.url}, 输出路径: {task.output_path}", bg='#F0F0F0', font=('Arial', 10))
        task_label.pack(side=tk.LEFT, padx=5)
        progress = ttk.Progressbar(task_frame, orient=tk.HORIZONTAL, length=300, mode='determinate')
        progress.pack(side=tk.LEFT, padx=5)
        pause_button = tk.Button(task_frame, text="暂停", command=lambda: self.pause_task(task), font=('Arial', 10), bg='#FFC107', fg='black')
        pause_button.pack(side=tk.LEFT, padx=5)
        cancel_button = tk.Button(task_frame, text="取消", command=lambda: self.cancel_task(task), font=('Arial', 10), bg='#F44336', fg='white')
        cancel_button.pack(side=tk.LEFT, padx=5)
        task.progress = progress
        task.pause_button = pause_button
        task.cancel_button = cancel_button

    def start_all_tasks(self):
        for task in self.tasks:
            thread = threading.Thread(target=self.download_task_with_progress, args=(task,))
            thread.start()

    def download_task_with_progress(self, task):
        try:
            task.download()
            # 调用 ffmpeg 进行处理
            if not task.is_cancelled:
                subprocess.run(task.ffmpeg_command, check=True)
        except subprocess.CalledProcessError as e:
            logging.error(f"ffmpeg 调用错误: {e}")
            messagebox.showerror("ffmpeg 错误", f"ffmpeg 调用错误: {e}")
        except Exception as e:
            logging.error(f"其他错误: {e}")
            messagebox.showerror("其他错误", f"其他错误: {e}")

    def pause_task(self, task):
        task.pause()
        task.pause_button.config(text="恢复", command=lambda: self.resume_task(task))

    def resume_task(self, task):
        task.resume()
        task.pause_button.config(text="暂停", command=lambda: self.pause_task(task))

    def cancel_task(self, task):
        task.cancel()
        task.pause_button.config(state=tk.DISABLED)
        task.cancel_button.config(state=tk.DISABLED)


if __name__ == "__main__":
    root = tk.Tk()
    app = DownloadManager(root)
    root.mainloop()
