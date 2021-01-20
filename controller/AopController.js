var express = require('express');
// 统一返回值
var R = require('../common/R.js');
// 子页面不用app 用router
let aop = express.Router();

// originFun为原函数，before和after为增强方法
function constructor(originFun, before, after){
    function _class(){
        before.apply(this, arguments);
        originFun.apply(this, arguments);
        after.apply(this, arguments);
    }
    return _class;
}

aop.get('/add/:front/:back',function (req,res) {
    let front = req.params.front
    let back = req.params.back
    // AOP增强
    calcAdd = constructor(calcAdd, function(){console.log("我在原方法前执行")}, function(){console.log("我在原方法后执行")});
    res.send(R.retrunResult(true,calcAdd(front, back),""));
})
function calcAdd(a,b){
    console.log(a + "+" + b + "=" + (a + b));
    return a+b;
}

//导出该路由
module.exports = aop;
