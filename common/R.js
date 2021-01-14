function retrunResult(ret,state,data,message){
    let result = {
        "ret":ret,
        "state":state,
        "data":data,
        "message":message
    }
    return result
}
module.exports = {
    retrunResult,
}
