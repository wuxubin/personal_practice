const blog = require('../model/blog')


var all = {
    path: '/api/blog/all',
    method: 'get',
    func: function(request, response) {
        var blogs = blog.all()
        var r = JSON.stringify(blogs)
        response.send(r)
    }
}

var add = {
    path: '/api/blog/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // 插入新数据并返回
        // 验证密码
        if(form.mima == '') {
            var b = blog.new(form)
            var r = JSON.stringify(b)
        } else {
            var r = JSON.stringify({
                
            })
        }
        response.send(r)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
