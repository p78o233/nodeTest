var express = require('express');
// 统一返回值
var R = require('../common/R.js');
var info = require('../common/PageInfo.js');
var conn = require('../common/MysqlConfig.js');
var util = require('../common/Utils.js')
// 子页面不用app 用router
let dbController = express.Router();

// 获取application/json
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


//=============================================================================================================================
//查询一条数据
dbController.get('/getQuery/:id',function (req, res) {
    let querySql = 'select * from test where id = ?'
    let queryParam = [req.params.id];
    // 这个返回的是数组类型的数据，所以只能数组取第零个去返回一条数据
    conn.connection.query(querySql,queryParam,async function (err,result) {
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        console.log(data[0])
        res.send(R.retrunResult(true,0,data[0],""));
    })
})


// 分页查询
dbController.get('/getQueryPage/:page/:pageSize', function (req, res) {
    // 分页条数
    let querySqlCount = 'select count(*) as count  from test';
    // 分页里面的页面
    let querySqlPage = 'select * from test order by id desc limit ? , ?'
    //这里参数一定要是数字，字符串就会报错
    let querySqlPageParams = [(parseInt(req.params.page)-1)*parseInt(req.params.pageSize),parseInt(req.params.pageSize)]
    conn.connection.query(querySqlCount,function (err,resultCount) {
        let dataStringCount = JSON.stringify(resultCount);
        let dataCount = JSON.parse(dataStringCount);
        let count = dataCount[0].count
        conn.connection.query(querySqlPage,querySqlPageParams, function (err,resultPage) {
            let pageInfo = info.info(count,resultPage);
            res.send(R.retrunResult(true,0,pageInfo,""));
        })
    })
})


// 新增一条
dbController.post('/insert',jsonParser,function (req, res) {
    let addSql = 'insert into test (name,cdNum,createTime,score,host) values (?,?,?,?,?)'
    let addSqlParams = ['p98o2',1,new Date(),12.5,'127.0.0.1'];
    conn.connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send(R.retrunResult(true,0,result,""));
    });
})
// 新增一条返回主键
dbController.post('/insertOne',jsonParser,function (req, res) {
    let addSql = 'insert into test (name,cdNum,createTime,score,host) values (?,?,?,?,?)'
    let addSqlParams = ['p98o2',1,new Date(),12.5,'😀'];
    conn.connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        else {
            // 新增成功后查出id
           res.send(R.retrunResult(true,0,result.insertId,""));
        }
    });
})
// 批量插入
dbController.post('/insertBatch',jsonParser,function (req, res) {
    let sql = 'insert into test (name,cdNum ) values ?'
    // 经过对象数组的格式转换
    let sqlParanms = util.reverse(req.body)
    // 参数外面还要多套一个中括号
    conn.connection.query(sql,[sqlParanms],function(err,result){
        res.send(R.retrunResult(true,0,result,""));
    })
})
// 修改
dbController.post('/update',jsonParser,function (req, res) {
    let sql = 'update test set name = ? where id = ?'
    let sqlParams = [req.body.name,req.body.id]
    conn.connection.query(sql,sqlParams,function(err,result){
        res.send(R.retrunResult(true,0,result,""));
    })
})
// 删除
dbController.post('/delete/:id',function (req, res) {
    let delSql = 'delete from test where id = ?'
    let delParams = [req.params.id]
    conn.connection.query(delSql,delParams,function(err,result){
        res.send(R.retrunResult(true,0,result,""));
    })
})
// 动态sql
dbController.get('/dynamic',jsonParser,function (req, res) {
    let id = req.query.id;
    let name = req.query.name;
    let sql = 'select * from test where 1 = 1'
    if(id !=undefined && id!=null){
        sql += ' and id = '.concat(id);
    }
    if(name != undefined && name != null){
        // 字符串都要加这个，不然字符串拼接的时候没有双引号
        sql += ' and name = '.concat("\'"+name+"\'")
    }
    conn.connection.query(sql,function (err,result) {
        res.send(R.retrunResult(true,0,result,""));
    })
})
//导出该路由
module.exports = dbController;
