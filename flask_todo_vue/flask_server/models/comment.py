import time

from models import Model
from utils import formatted_time, log
from routes import current_user


class Comment(Model):
    """
    针对数据 Comment
    要做 4 件事情
    C create 创建数据
    R read 读取数据
    U update 更新数据
    D delete 删除数据

    Comment.new() 来创建一个 comment
    """

    @classmethod
    def valid_names(cls):
        names = super().valid_names()
        names = names + [
            'username',
            'content',
            'user_id',
            'blog_id',
            'created_time',
            'updated_time',
        ]
        return names

    @classmethod
    def new(cls, form):
        m = super().new(form)
        m.blog_id = int(form.get('blog_id'))
        user = current_user()
        m.username = user.username
        m.user_id = user.id
        t = int(time.time())
        m.created_time = t
        m.updated_time = t
        m.save()
        return m

    @classmethod
    def update(cls, id, form):
        m = super().update(id, form)
        log('comment update', m)
        m.updated_time = int(time.time())
        m.save()
        return m

    def formatted_created_time(self):
        return formatted_time(self.created_time)

    def formatted_updated_time(self):
        return formatted_time(self.updated_time)
