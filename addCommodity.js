var express = require('express');
var add = express();
var fs = require("fs");

add.post('/addCommodity', function (req, res) {

  fs.readFile(__dirname + "/" + "commoditys.json", 'utf8', function (err, data) {
    if(data === ""){
      data += "[]";
    }
    var dataArray = JSON.parse(data);
    var id = dataArray.length + 1;
    var newCommodity = {
      "id": id,
      "barcode": req.body.barcode,
      "name": req.body.name,
      "unit": req.body.unit,
      "price": req.body.price
    };

    console.log(req.body.barcode+req.body.name+req.body.unit+ req.body.price);

    if (typeof(req.body.barcode) != "string"
      || typeof(req.body.name) != "string"
      || typeof(req.body.unit) != "string"
      || typeof(req.body.price) != "number") {

      res.status(401).end();
    } else {

      dataArray.push(newCommodity);
      res.status(200).json(dataArray);
      fs.writeFile('commoditys.json', JSON.stringify(dataArray));
    }

  });
});

module.exports = add;
