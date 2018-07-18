import json
from functools import wraps

from models.todo import Todo
from utils import log
from models.user import User

from flask import (
    request,
    redirect,
    url_for,
    session,
)


def current_user():
    log('cookies:', request.cookies)
    # user_id = request.cookies.get('user_id', None)
    user_id = session.get('user_id', None)
    if user_id is not None:
        user_id = int(user_id)
        log('cookies:', user_id)
        u = User.find(user_id)
        return u
    else:
        return None


def login_required(route_function):
    """
    登录权限装饰器，需要登录
    """

    @wraps(route_function)
    def f(*args, **kwargs):
        u = current_user()
        if u is None:
            log('非登录用户')
            return redirect(url_for('user.login'))
        else:
            return route_function(*args, **kwargs)

    return f