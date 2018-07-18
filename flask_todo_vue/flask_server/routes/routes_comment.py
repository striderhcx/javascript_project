from flask import (
    render_template,
    Blueprint,
)

# 创建一个蓝图对象
# 路由都定义在蓝图对象中
# 然后再 flask 主代码中 注册蓝图 来使用
# 第一个参数是蓝图的名字 类似namespace的作用
# 第二个参数是套路
main = Blueprint('comment', __name__)

'''
@main.route('/index')
def index():
    """
    主页的处理函数, 返回主页的响应
    """
    return render_template('comment_index.html')


@main.route('/new')
def new():
    """
    主页的处理函数, 返回主页的响应
    """
    return render_template('comment_new.html')

@main.route('/detail')
def detail():
    """
    主页的处理函数, 返回主页的响应
    """
    return render_template('comment_detail.html')
'''