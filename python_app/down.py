import sys
import requests
import subprocess
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QPushButton, QListWidget, QMessageBox


class DownloadTask:
    def __init__(self, url, output_path):
        self.url = url
        self.output_path = output_path
        self.process = None

    def download(self):
        try:
            response = requests.get(self.url, stream=True)
            response.raise_for_status()
            with open(self.output_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=8192):
                    file.write(chunk)
            print(f"文件已成功下载到 {self.output_path}")
        except requests.RequestException as e:
            print(f"下载文件时出错: {e}")


class DownloadManager(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('下载管理器')
        self.setGeometry(100, 100, 400, 300)

        self.url_input = QLineEdit()
        self.output_path_input = QLineEdit()
        self.add_task_button = QPushButton('添加任务')
        self.add_task_button.clicked.connect(self.add_task)
        self.task_list = QListWidget()
        self.start_all_button = QPushButton('开始所有任务')
        self.start_all_button.clicked.connect(self.start_all_tasks)

        input_layout = QHBoxLayout()
        input_layout.addWidget(QLabel('URL:'))
        input_layout.addWidget(self.url_input)
        input_layout.addWidget(QLabel('输出路径:'))
        input_layout.addWidget(self.output_path_input)
        input_layout.addWidget(self.add_task_button)

        main_layout = QVBoxLayout()
        main_layout.addLayout(input_layout)
        main_layout.addWidget(self.task_list)
        main_layout.addWidget(self.start_all_button)

        self.setLayout(main_layout)
        self.tasks = []

    def add_task(self):
        url = self.url_input.text()
        output_path = self.output_path_input.text()
        if url and output_path:
            task = DownloadTask(url, output_path)
            self.tasks.append(task)
            self.task_list.addItem(f"URL: {url}, 输出路径: {output_path}")
            self.url_input.clear()
            self.output_path_input.clear()
        else:
            QMessageBox.warning(self, '输入错误', '请输入有效的 URL 和输出路径。')

    def start_all_tasks(self):
        for task in self.tasks:
            try:
                task.download()
                # 这里可以添加调用 ffmpeg 的代码，例如：
                # ffmpeg_command = ["ffmpeg", "-i", task.output_path, "processed_" + task.output_path]
                # subprocess.run(ffmpeg_command, check=True)
            except Exception as e:
                QMessageBox.critical(self, '错误', f'任务执行失败: {e}')


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = DownloadManager()
    window.show()
    sys.exit(app.exec_())
