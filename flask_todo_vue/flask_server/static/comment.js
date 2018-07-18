// COMMENT API
// 获取所有 comment
var apiCommentAll = function(blog_id, callback) {
    var path = '/api/comment/all?blog_id=' + blog_id
    ajax('GET', path, '', callback)
}

// 删除一个 comment
var apiCommentDelete = function(id, callback) {
    var path = '/api/comment/delete?id=' + id
    ajax('GET', path, '', callback)
}


// TODO DOM
var commentTemplate = function(comment) {
    var id = comment.id
    var content = comment.content
    //把输入框中的普通文本生成markedown的html格式
    content = marked(comment.content)
    //{# 貌似必须是div标签才可以，textarea不行， 必须指定class="markdown-body" #}
    var updated_time = timeString(comment.updated_time)
    // data-* 是 HTML5 新增的自定义标签属性的方法
    // data-id="1" 获取属性的方式是 .dataset.id
    var t = `
        <tr class="comment-cell" data-id="${id}">
            <td>
            <div class="markdown-body">${content}</div>
            </td>
            <td>
            <span>${updated_time}</span>
            </td>
            <td>
            <button class="comment-delete pure-button" data-id="${id}">删除</button>
            </td>
        </tr>
    `
    return t
}

var insertComment = function(comment) {
    var commentCell = commentTemplate(comment)
    // 插入 comment-list
    var commentList = e('#id-comment-list')
    commentList.insertAdjacentHTML('beforeend', commentCell)
}

var loadComments = function() {
    // 调用 ajax api 来载入数据
    var blog_id = e('#id-blog-cell').dataset.id
    apiCommentAll(blog_id, function(r) {
        console.log('load all', r)
        // 解析为 数组
        var comments = JSON.parse(r)
        // 循环添加到页面中
        for(var i = 0; i < comments.length; i++) {
            var comment = comments[i]
            insertComment(comment)
        }
    })
}

var bindEventCommentDelete = function() {
    var commentList = e('#id-comment-list')
    log(commentList)
    // 注意, 第二个参数可以直接给出定义函数
    commentList.addEventListener('click', function(event){
        log(event)
        // 可以通过 event.target 来得到被点击的对象
        var self = event.target
        // 通过比较被点击元素的 class
        // 来判断元素是否是想要的
        // classList 属性保存了元素所有的 class
        log(self.classList)
        if (self.classList.contains('comment-delete')) {
            log('点到了 删除按钮')
            var commentId = self.dataset.id
            apiCommentDelete(commentId, function(r) {
                log('服务器响应删除成功', r)
                // 收到返回的数据, 删除 self 的父节点
                self.closest('.comment-cell').remove()
            })
          }
      })

}
// 增加一个 comment
var apiCommentAdd = function(form, callback) {
    var path = '/api/comment/add'
    ajax('POST', path, form, callback)
}

var bindEventCommentAdd = function() {
    var b = e('#id-button-add')
    // 注意, 第二个参数可以直接给出定义函数
    b.addEventListener('click', function(){
        var content = e('#id-input-content').value
        var blog_id = e('#id-blog-cell').dataset.id
        var form = {
            blog_id: blog_id,
            content: content,
        }
        apiCommentAdd(form, function(r) {
            // 收到返回的数据, 插入到页面中
            var comment = JSON.parse(r)
            log(comment)
            window.location = comment.redirect
        })
    })
}


var bindEvents = function() {
    bindEventCommentAdd()
    bindEventCommentDelete()
}

var __main = function() {
    bindEvents()
    loadComments()
}

__main()
