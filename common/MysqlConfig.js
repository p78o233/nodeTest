// 数据库链接   cnpm install mysql --save，只会在server里面创建一次
var mysqlConfig      =  require('mysql');
// https://www.cnblogs.com/shenlonghun/p/6122034.html
var connection = mysqlConfig.createPool({
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'oa',
    charset:"utf8mb4",
    timezone:"local",

})
connection.getConnection(function(err,conn){
    if(err){
        console.log('与mysql数据库建立连接失败');
    }else{
        console.log('与mysql数据库建立连接成功');
    }
})
module.exports = {
    connection
}
