var mysql = require('mysql');

// 1. 创建连接
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mywxb'
});

// 2. 连接数据库 打开冰箱门
connection.connect();

// 3. 执行数据操作 把大象放到冰箱
connection.query('SELECT * FROM `websites`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.query('INSERT INTO websites VALUES(7, "admin", "123456",222,"cn")', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

// 4. 关闭连接 关闭冰箱门
connection.end();
