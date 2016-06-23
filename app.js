var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', require('./addCommodity'));
app.use('/', require('./listCommodity'));
app.use('/', require('./searchCommodity'));
app.use('/', require('./deleteCommodity'));
app.use('/', require('./updateItem'));

fs.stat("commoditys.json", function (err, stat) { //通过异步模式获取文件信息
  if ((stat && stat.isFile())) {
    console.log("json文件存在！");
  } else {
    fs.open("commoditys.json", "a", function (err, fd) {
      if (err) {
        console.log('创建失败！');
      }
    });
  }
});

app.listen(8081);


