var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var md5 = require('blueimp-md5')

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
// 配置静态文件目录
// app.use(express.static('static'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.post('/process_post', function (req, res) {

    var b = md5(md5(req.body.first_name))
    console.log(b, 'bbb')
    // 输出 JSON 格式
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };

    console.log(response);
    // res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})


