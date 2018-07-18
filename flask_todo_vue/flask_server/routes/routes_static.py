from flask import (
    render_template,
    Blueprint,
    request,
    abort,
)

from routes import current_user, login_required
from utils import log

main = Blueprint('static', __name__)


@main.route('/')
@login_required
def index():
    """
    主页的处理函数, 返回主页的响应
    """
    u = current_user()
    log('current user', u)
    return render_template('index.html', username=u.username)

@main.route('/error')
def error():
    code = int(request.args.get('code'))
    abort(code)
