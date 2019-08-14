var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var md5 = require('blueimp-md5')
var session = require('express-session')

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
// 配置静态文件目录
// app.use(express.static('static'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))


app.get('/', function (req, res) {
    console.log(req.session.user)
    res.sendFile(__dirname + "/" + "index.html");
})

app.post('/api/blog/dglu', function (req, res) {
    console.log(req.body)


    var b = md5(md5(req.body.vhhc))
    // 输出 JSON 格式
    var response = {
        "vhhc": req.body.vhhc,
        "mima": req.body.mima
    };

    req.session.user = req.body.vhhc
    console.log('xxx', req.session.user)
    res.end(JSON.stringify(response));
    // res.status(200).json({
    //     err_code: 0,
    //     message: 'OK'
    // })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})


