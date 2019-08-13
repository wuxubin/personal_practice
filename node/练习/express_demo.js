var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('static'))

var sendHtml = function (path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function (err, data) {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}


app.get('/', function (request, response) {
    var path = 'index.html'
    sendHtml(path, response)
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
  
    console.log("应用实例，访问地址为 http://%s:%s",
      host, port)
  })