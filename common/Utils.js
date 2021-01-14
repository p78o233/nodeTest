// 批量插入数据改装
function reverse(dataList) {
    //dataList 就是对象数组[{},{}]
    let returnList = [];
    for(var i = 0;i<dataList.length;i++){
       let itemList = [];
        for (var key in dataList[i]) {
            itemList.push(dataList[i][key]);
        }
        returnList.push(itemList);
    }
    return returnList;
}
module.exports = {
    reverse,
}
