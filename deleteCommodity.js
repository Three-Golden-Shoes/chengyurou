var express = require('express');
var del = express();
var fs = require('fs');

del.delete('/deleteCommodity/:id', function (req, res) {
  fs.readFile(__dirname + "/commoditys.json", 'utf8', function (err, data) {
    if (data === "") {
      data += "[]";
    }

    var dataArray = JSON.parse(data);
    var id = parseInt(req.params.id);
    var temp = false;

    dataArray.forEach(function (item) {
      if (item != null) {
        if (item.id === id) {
          delete dataArray[dataArray.indexOf(item)];
          temp = true;
        }
      }
    });

    if (temp === false) {
      res.status(404).end();
    } else {
      res.status(204).json(dataArray);
      fs.writeFile('commoditys.json', JSON.stringify(dataArray));
    }
  });
});

module.exports = del;
