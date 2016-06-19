var express = require("express");
var list = express();
var fs = require("fs");

list.get('/listCommodity', function (req, res) {
  fs.readFile(__dirname + '/commoditys.json', 'utf8', function (err, data) {
    if(data === ""){
      data += "[]";
    }

      var dataArray = JSON.parse(data);
      res.status(200).json(dataArray);
  });
});

module.exports = list;