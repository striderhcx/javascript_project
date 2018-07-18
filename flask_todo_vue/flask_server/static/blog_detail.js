var apiBlogDetail = function(callback) {
    var path = '/api/blog/detail' + window.location.search
    ajax('GET', path, '', callback)
}


var loadBlog = function() {
    // 调用 ajax api 来载入数据
    apiBlogDetail(function(r) {
        console.log('load all', r)
        var blog = JSON.parse(r)

        e('#id-blog-title').innerText = blog.title
        document.title = blog.title

        var m = marked(blog.content)
        e('#id-blog-content').innerHTML = m

    })
}

var __main = function() {
    loadBlog()
}

__main()