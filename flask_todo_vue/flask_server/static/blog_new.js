// TODO API
// 获取所有 blog
// 增加一个 blog
var apiBlogAdd = function(form, callback) {
    var path = '/api/blog/add'
    ajax('POST', path, form, callback)
}

var bindEventBlogAdd = function() {
    var b = e('#id-button-add')
    // 注意, 第二个参数可以直接给出定义函数
    b.addEventListener('click', function(){
        var title = e('#id-input-title').value
        var content = e('#id-input-content').value
        log('click add', title)
        var form = {
            title: title,
            content: content,
        }
        apiBlogAdd(form, function(r) {
            // 收到返回的数据, 插入到页面中
            var blog = JSON.parse(r)
            log(blog)
            window.location = blog.redirect
        })
    })
}


var bindEvents = function() {
    bindEventBlogAdd()
}

var __main = function() {
    bindEvents()
}

__main()