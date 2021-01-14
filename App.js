
var express = require('express');
var app = express();

// 引入新页面的路由前缀
app.use('/api',require('./controller/ApiController.js'))
app.use('/uploadUrl',require('./controller/UploadController.js'))
app.use('/db',require('./controller/DbController.js'))

// 访问静态资源  访问路径 ip:port/static/文件名
const path = require('path');
app.use('/static', express.static('public'));

// 数据库链接
var mysql = require('./common/MysqlConfig.js');


//=======================================================================================================

//404判断
app.use(function (req, res) {
    res.send('404 not found');
});

// 正常启动命令   node App.js
//debugger 启动命令 1） node --inspect App.js  2）谷歌浏览器打开 chrome://inspect   3)remote Targer 里面点击inspect就进入调试界面

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
