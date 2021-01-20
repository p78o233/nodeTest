function retrunResult(ret,state,data,message,req){
    let result = {
        "ret":ret,
        "state":state,
        "data":data,
        "message":message
    }
    // 如果把request也传进来那么久打印出返回值
    if(req!=null&&req!=undefined) {
        console.log("======================================================")
        console.log(req.originalUrl+"请求的返回值为返回值为"+JSON.stringify(data))
        console.log("======================================================")
    }
    return result
}
module.exports = {
    retrunResult,
}
