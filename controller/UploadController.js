var express = require('express');
// 统一返回值
var R = require('../common/R.js');
// 子页面不用app 用router
let uploadController = express.Router();


// body-parser
let bodyParser=require('body-parser');
// 引入 formidable
let formidable=require('formidable');
// 文件操作
let fs=require('fs');
let path=require('path');

// 处理post数据的提交
uploadController.use(bodyParser.urlencoded({extended:false}));
// 配置静态资源路径
uploadController.use(express.static(path.join(__dirname,'public')));

//=============================================================================================================
// 文件上传例子

// 单个文件上传接口
uploadController.post('/uploadFile',(req, res)=>{
    // 图片上传操作
    let form=new formidable.IncomingForm();
    form.parse(req,(err,files,file)=>{
        /* 1.上传[将图片从本地，上传到服务器]
        获取文件所在的位置 - 读取的管道流 - 管道流写的方式写进去 - 管道流
        */
        let read=fs.createReadStream(file.userFile.path);
        // 写入的时候，文件夹的名称如果不存在，则会写入失败了；需要手动创建
        // 上传的文件的字段名  userFile
        let write=fs.createWriteStream('./public/'+file.userFile.name);
        read.pipe(write); // pipe 管道传输


        // 2. 上传完成之后查看图片
        let retrunResultUrl = 'http://127.0.0.1:8081/public/'+file.userFile.name
        res.send(R.retrunResult(true,0,retrunResultUrl,""));
    })
})

//导出该路由
module.exports = uploadController;
