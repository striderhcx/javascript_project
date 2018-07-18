from flask import (
    jsonify,
    Blueprint,
    request,
    redirect,
    url_for)

from utils import log
from models.blog import Blog

main = Blueprint('blog_api', __name__)


# 本文件只返回 json 格式的数据
# 而不是 html 格式的数据


@main.route('/all', methods=['GET'])
def all():
    # blog_list = Blog.all()
    # # 要转换为 dict 格式才行
    # blogs = [t.json() for t in blog_list]
    blogs = Blog.all_json()
    return jsonify(blogs)


@main.route('/detail', methods=['GET'])
def detail():
    blog_id = int(request.args.get('id'))
    b = Blog.find(blog_id)
    return jsonify(b.json())


@main.route('/add', methods=['POST'])
def add():
    # 得到浏览器发送的表单, 浏览器用 ajax 发送 json 格式的数据过来
    # 所以这里用新增加的 json 函数来获取格式化后的 json 数据
    form = request.get_json()
    # 创建一个 blog
    t = Blog.new(form)
    # 把创建好的 blog 返回给浏览器
    log('test blog add')
    # 注意：ajax 重定向要在前端做
    response = t.json()
    response['redirect'] = url_for('blog.index')
    return jsonify(response)


@main.route('/delete', methods=['GET'])
def delete():
    blog_id = int(request.args.get('id'))
    t = Blog.delete(blog_id)
    return jsonify(t.json())