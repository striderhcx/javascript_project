实现的功能：
--------
todo界面的完全前后端分离（其他界面还没改）

运行
---------
1、  python3 app.py

2、 按照gif图，先登录，选择todo

3、 share

4、如果需要修改界面，请自行安装vue脚手架工具，修改appfront中TodoItem后拷贝到.vue、 TodoList.vue等文件进行重新编译打包；
将打包生成的dist路径下的static下的文件拷贝到flask_server/static下，index.html改名为todo_vue.html后拷贝到flask_server/templates路径下；


展示：
![image](https://github.com/striderhcx/javascript_project/blob/master/flask_todo_vue/flask_todo_vue.gif)

