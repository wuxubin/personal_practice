下划线(_)变量
你可以使用下划线(_)获取上一个表达式的运算结果：

cls：清空cmd内容
``` js
var fs = require("fs");
// 阻塞
var data = fs.readFileSync('input.txt');
console.log(data.toString());
// 非阻塞
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
```