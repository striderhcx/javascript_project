博客实现概要思路：
--------

1. 准备 model
    - 博客 model blog
        - id
        - title
        - content
        - user_id
        - created_time
        - updated_time
    - 博客 model comment
        - id
        - username
        - content
        - created_time
        - updated_time
        - user_id
        - blog_id

2. 写出操作场景的文档 （要对这些数据进行什么操作，这是最重要的一步）
    - 有一个主页，可以看到所有博客的标题和时间
        - 主页有链接可以发表新博客
        - 主页可以点博客标题进入博客的详情页
    - 发表博客页面有一个表单可以发表博客
    - 博客的详细页面
        - 标题 作者 内容 时间
        - 所有评论的列表
        - 有一个输入框 可以输入评论
        - 输入之后 页面可以看到最新的评论
3. 根据文档，写好 CRUD操作和其他操作
    - `Blog.all`
    - `Blog.new`
    - `Blow.find`
    - `Comment.all`
    - `Comment.new`
    - `Comment.find`
4. 写路由函数
5. 画 HTML 页面
6. 用 js 实现相关页面的逻辑
7. 美化页面
8. 其他