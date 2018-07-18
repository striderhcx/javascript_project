import time

from models import Model
from utils import formatted_time, log


class Todo(Model):
    """
    针对数据 TODO
    要做 4 件事情
    C create 创建数据
    R read 读取数据
    U update 更新数据
    D delete 删除数据

    Todo.new() 来创建一个 todo
    """

    @classmethod
    def valid_names(cls):
        names = super().valid_names()
        names = names + [
            'task',
            'created_time',
            'updated_time',
        ]
        return names

    @classmethod
    def new(cls, form):
        m = super().new(form)
        #t = int(time.time())
        t = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
        m.created_time = t
        m.updated_time = t
        m.save()
        return m

    @classmethod
    def update(cls, id, form):
        m = super().update(id, form)
        log('todo update', m)
        m.updated_time = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
        m.save()
        return m

    def formatted_created_time(self):
        return formatted_time(self.created_time)

    def formatted_updated_time(self):
        return formatted_time(self.updated_time)
