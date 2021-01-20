// 数据库链接   cnpm install mysql --save，只会在server里面创建一次
var mysqlConfig      =  require('mysql');
var connection = mysqlConfig.createConnection({
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'oa',
    charset:"utf8mb4"
});
connection.connect();


module.exports = {
    connection
}
