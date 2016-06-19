var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '1mb'})); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

var fs = require("fs");
var addCommodity = require('./addCommodity');
var listCommodity = require('./listCommodity');
var searchCommodity = require('./searchCommodity');
var deleteCommodity = require('./deleteCommodity');
var updateItem = require('./updateItem');

app.use('/', addCommodity);
app.use('/', listCommodity);
app.use('/', searchCommodity);
app.use('/', deleteCommodity);
app.use('/', updateItem);

fs.stat("commoditys.json", function (err, stat) { //通过异步模式获取文件信息
  if ((stat && stat.isFile())) {
    console.log("json文件存在！");
  } else {
    fs.open("commoditys.json", "a", function (err, fd) {
      if (err) {
        console.log('创建失败！');
        return;
      }
    });
  }
});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});


