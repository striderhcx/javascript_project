from flask import (
    redirect,
    Blueprint,
    request,
    session,
    url_for,
    make_response
)

from utils import log
from models.user import User

main = Blueprint('user_api', __name__)


@main.route('/login', methods=['POST'])
def login():
    """
    登录页面的路由函数
    """
    log('login, cookies', request.cookies)
    form = request.form
    u = User.new(form)
    if u.validate_login():
        u = User.find_by(username=u.username)
        # 登录后定向到 /
        # cookie
        # response = make_response(redirect(url_for('static.index')))
        # response.set_cookie('user_id', str(u.id))
        # return response
        session['user_id'] = u.id
        return redirect(url_for('static.index'))
    else:
        return redirect(url_for('user.login'))


@main.route('/register', methods=['POST'])
def register():
    """
    注册页面的路由函数
    """
    form = request.form
    u = User.new(form)
    if u.validate_register():
        # 注册成功再保存
        u.save()
        # 注册成功后 定向到登录页面
        return redirect(url_for('user.login'))
    else:
        # 注册失败 定向到注册页面
        return redirect(url_for('user.register'))
