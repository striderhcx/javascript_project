from flask import Flask, render_template
from routes.routes_todo import main as todo_view
from routes.api_todo import main as todo_api
from routes.routes_blog import main as blog_view
from routes.api_blog import main as blog_api
from routes.routes_comment import  main as comment_view
from routes.api_comment import  main as comment_api
from routes.routes_user import main as user_view
from routes.api_user import main as user_api
from routes.routes_static import main as index_view

app = Flask(__name__)
# 注册路由
app.register_blueprint(todo_view, url_prefix='/todo')
app.register_blueprint(todo_api, url_prefix='/api/todo')
app.register_blueprint(blog_view, url_prefix='/blog')
app.register_blueprint(blog_api, url_prefix='/api/blog')
app.register_blueprint(comment_view, url_prefix='/comment')
app.register_blueprint(comment_api, url_prefix='/api/comment')
app.register_blueprint(user_view, url_prefix='/user')
app.register_blueprint(user_api, url_prefix='/api/user')
app.register_blueprint(index_view)

app.secret_key = 'daskdhkjashdjkas'

@app.errorhandler(404)
def error(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    # 生成配置并且运行程序
    # 自动 reload jinja
    # flask bug https://github.com/pallets/flask/pull/2373
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.jinja_env.auto_reload = True
    # 关闭 js 缓存
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=2000,

    )
    #**kwargs 的用法:解包字典，会把字典中对应的键和run(debug= ， host=  , port= )中的关键字参数一一对应
    app.run(**config)
