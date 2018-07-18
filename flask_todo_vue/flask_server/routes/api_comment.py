from flask import (
    jsonify,
    Blueprint,
    request,
    redirect,
    url_for)

from utils import log
from models.comment import Comment
from routes import current_user

main = Blueprint('comment_api', __name__)


# 本文件只返回 json 格式的数据
# 而不是 html 格式的数据


@main.route('/all', methods=['GET'])
def all():
    blog_id =int(request.args.get("blog_id"))
    #找出所有blog_id=blog_id的评论
    comment_list = Comment.find_all(blog_id=blog_id)
    log('comment_list::' ,comment_list)
    # # 要转换为 dict 格式才行
    comments = [t.json() for t in comment_list]
    #comments = Comment.all_json()
    return jsonify(comments)


@main.route('/detail', methods=['GET'])
def detail():
    comment_id = int(request.args.get('id'))
    b = Comment.find(comment_id)
    return jsonify(b.json())


@main.route('/add', methods=['POST'])
def add():
    # 得到浏览器发送的表单, 浏览器用 ajax 发送 json 格式的数据过来
    # 所以这里用新增加的 json 函数来获取格式化后的 json 数据
    if current_user() == None:
        response={}
        response['redirect'] = url_for('user.login')
        return jsonify(response)
    form = request.get_json()
    # 创建一个 comment
    c = Comment.new(form)
    # 把创建好的 comment 返回给浏览器
    log('test comment add')
    #注意：ajax 重定向要在前端做
    response = c.json()
    #添加完评论应该重定向到博客详情页，需要传参数id=c.blog_id进去，否则无法知道重定向回哪篇博客
    response['redirect'] = url_for('blog.detail', id=c.blog_id)
    log('add response',response)
    return jsonify(response)


@main.route('/delete', methods=['GET'])
def delete():
    comment_id = int(request.args.get('id'))
    t = Comment.delete(comment_id)
    return jsonify(t.json())