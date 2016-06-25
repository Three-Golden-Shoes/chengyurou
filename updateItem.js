var express = require("express");
var update = express();
var fs = require('fs');

update.post('/updateItem', function (req, res) {

  fs.readFile(__dirname + '/commoditys.json', function (err, data) {
    if (data === "") {
      data += "[]";
    }

    var dataArray = JSON.parse(data);
    var temp = false;
    var newCommodity = {
      "id": req.body.id,
      "barcode": req.body.barcode,
      "name": req.body.name,
      "unit": req.body.unit,
      "price": req.body.price
    };

    dataArray.forEach(function (item) {
      if (item != null) {
        if (item.id == newCommodity.id) {
          dataArray.splice(dataArray.indexOf(item), 1, newCommodity);
          temp = true;
        }
      }
    });


  });
  if (temp == false) {
    res.status(401).end();
  } else {
    fs.writeFile('commoditys.json', JSON.stringify(dataArray));
    res.status(200).json(dataArray);
  }
});

module.exports = update;