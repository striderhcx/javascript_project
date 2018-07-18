from flask import (
    jsonify,
    Blueprint,
    request,
    redirect,
)

from utils import log
from models.todo import Todo

main = Blueprint('todo_api', __name__)


# 本文件只返回 json 格式的数据
# 而不是 html 格式的数据


@main.route('/all', methods=['GET'])
def all():
    # todo_list = Todo.all()
    # # 要转换为 dict 格式才行
    # todos = [t.json() for t in todo_list]
    todos = Todo.all_json()
    return jsonify(todos)

'''请求/todo/5/得到id=5的详情'''
@main.route('/<int:id>', methods=['GET'])
def get_detail(id):
    todo_id = id
    t = Todo.find(todo_id)
    return jsonify(t.json())

@main.route('/add', methods=['POST'])
def add():
    # 得到浏览器发送的表单, 浏览器用 ajax 发送 json 格式的数据过来
    # 所以这里用新增加的 json 函数来获取格式化后的 json 数据
    form = request.get_json()
    # 创建一个 todo
    t = Todo.new(form)
    # 把创建好的 todo 返回给浏览器
    return jsonify(t.json())


@main.route('/delete', methods=['GET'])
def delete():
    todo_id = int(request.args.get('id'))
    t = Todo.delete(todo_id)
    return jsonify(t.json())


@main.route('/update', methods=['POST'])
def update():
    form = request.get_json()
    todo_id = int(form.get('id'))
    t = Todo.update(todo_id, form)
    return jsonify(t.json())
