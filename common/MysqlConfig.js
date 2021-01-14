// 数据库链接   cnpm install mysql，只会在server里面创建一次
var mysqlConfig      =  require('mysql');
var connection = mysqlConfig.createConnection({
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'oa'
});
connection.connect();


module.exports = {
    connection
}
