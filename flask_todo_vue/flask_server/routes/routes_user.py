from flask import (
    render_template,
    Blueprint,
)

main = Blueprint('user', __name__)


@main.route('/login')
def login():
    """
    登录页面的路由函数
    """
    return render_template('login.html')


@main.route('/register')
def register():
    """
    注册页面的路由函数
    """
    # 显示注册页面
    return render_template('register.html')
