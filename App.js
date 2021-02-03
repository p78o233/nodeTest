var express = require('express');
var app = express();
// 获取application/json
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
// 统一返回值
var R = require('./common/R.js');

// 定时任务
// npm install node-schedule --save
// const schedule = require('node-schedule');

//============================================这两个一定要写在路由的前面不然不起效===================================================================================
let logFlag = false;
// 拦截器
app.use('/*', jsonParser, function (req, res, next) {
    var openPage = ['/api/index', '/json', '/json/version', '/switchLogFlag'];
    var url = req.originalUrl;
    // 过滤url
    if (openPage.indexOf(url) > -1) {
        // 不过上述的路径
        next();
    } else {
        // 打印出请求的方法，参数
        if (logFlag) {
            logIn(req, res)
        }
        next();
    }
});

// 打印出请求的方法，参数
function logIn(req, res) {
    // 请求的路径
    console.log("============================================")
    console.log("访问路径" + req.originalUrl)
    console.log("================头部数据=====================")
    for (var key in req.headers) {
        console.log(key + ":" + req.headers[key])
    }
    console.log(JSON.stringify(req.headers))
    console.log("================query数据=====================")
    for (var key in req.query) {
        console.log(key + ":" + req.query[key])
    }
    console.log(JSON.stringify(req.query))
    if (req.method === "POST") {
        console.log("================application/json数据=====================")
        if (req.body.length == 0) {
            for (var key in req.body) {
                console.log(key + ":" + req.body[key])
            }
        } else {
            for (let i = 0; i < req.body.length; i++) {
                for (var key in req.body[i]) {
                    console.log(key + ":" + req.body[i][key])
                }
                console.log("---------------------------------------------")
            }
        }
        console.log(JSON.stringify(req.body))
    }
}

// 跨域处理  设置跨域访问
app.all("/*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

//=========================================路由配置开始==============================================================================
// 引入新页面的路由前缀
app.use('/api', require('./controller/ApiController.js'))
app.use('/uploadUrl', require('./controller/UploadController.js'))
app.use('/db', require('./controller/DbController.js'))
app.use('/aop', require('./controller/AopController.js'))
//==========================================路由配置结束==============================================================================

//==========================================静态文件配置开始===========================================================================
// 访问静态资源  访问路径 ip:port/static/文件名
const path = require('path');
app.use('/static', express.static('public'));
//==========================================静态文件配置结束=============================================================================
// 数据库链接
var mysql = require('./common/MysqlConfig.js');


//====================================这些要放在404之前执行===================================================================
// 控制是否打印入参参数
app.get('/switchLogFlag', function (req, res) {
    if (req.query.logFlag === "1") {
        logFlag = true
    } else if (req.query.logFlag === "0") {
        logFlag = false
    }
    res.send(R.retrunResult(true, 0, logFlag, "操作成功"));
})

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

    // 定时任务
    // schedule.scheduleJob('3 * * * * *', () => {
    //     console.log('scheduleCronstyle:' + new Date());
    // });
})
