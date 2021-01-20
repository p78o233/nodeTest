var express = require('express');
// 统一返回值
var R = require('../common/R.js');
// 子页面不用app 用router
let apiController = express.Router();

// 获取application/json
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


//============================================================================================
//参数获取例子

/**
 * @api {get} /api/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup api模块
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "username" : "用户名",
 *          "password" : "密码"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/index/login
 * @apiVersion 0.0.1
 */
apiController.get('/index', function (req, res) {
    res.send('Hello World');
})
// 返回统一格式的json数据
apiController.get('/sameJson',function (req, res) {
    res.send(R.retrunResult(true,0,"",""));
})

// 接收get方法 url参数
apiController.get('/getUrlParam',function (req, res) {
    var responseData = {
        "name":req.query.name,
        "age":req.query.age
    }
    res.send(R.retrunResult(true,0,responseData,""));
})

// 获取application/json数据
apiController.post('/getJson',jsonParser,function (req, res) {
    var responseData = {
        "name":req.body.userName,
        "age":req.body.age
    }
    // res.send(R.retrunResult(true,0,responseData,""));
    res.send(R.retrunResult(true,0,responseData,"",req));
})

// 获取header数据
apiController.get('/getHeader',function (req, res) {
    var responseData = {
        "token":req.get("token")
    }
    res.send(R.retrunResult(true,0,responseData,""));
})

// 获取rest参数
apiController.get('/getRestParams/:id/:name',function (req, res) {
    console.log("id = "+ req.params.id)
    console.log("name = "+ req.params.name)
    res.send(R.retrunResult(true,req.params,""));
})
// emoji数据
apiController.get("/getEmoji",function (req,res) {
    var responseData = {
        "name":req.query.name,
    }
    res.send(R.retrunResult(true,responseData,""));
})
//导出该路由
module.exports = apiController;
