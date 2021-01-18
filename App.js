
var express = require('express');
var app = express();


//============================================这两个一定要写在路由的前面不然不起效===================================================================================

// 拦截器
app.use('/*',function(req, res, next) {
    var openPage = ['/api/index'];
    var url = req.originalUrl;
    // 过滤上述的url
    if(openPage.indexOf(url)>-1){
        next();
    }else{
        next();
    }
});
// 跨域处理  设置跨域访问
app.all("/*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

//=========================================路由配置开始==============================================================================
// 引入新页面的路由前缀
app.use('/api',require('./controller/ApiController.js'))
app.use('/uploadUrl',require('./controller/UploadController.js'))
app.use('/db',require('./controller/DbController.js'))
//==========================================路由配置结束==============================================================================

//==========================================静态文件配置开始===========================================================================
// 访问静态资源  访问路径 ip:port/static/文件名
const path = require('path');
app.use('/static', express.static('public'));
//==========================================静态文件配置结束=============================================================================
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
