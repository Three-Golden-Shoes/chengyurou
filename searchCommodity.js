var express = require('express');
var search = express();
var fs = require("fs");

search.put('/searchCommodity/:id', function (req, res) {
  fs.readFile(__dirname + '/commoditys.json', 'utf8', function (err, data) {
    if(data === ""){
      data += "[]";
    }
    
    var dataArray = JSON.parse(data);
    var searchItem;
    var id = parseInt(req.params.id);

    dataArray.forEach(function (item) {
      if (item != null) {
        if (item.id === id) {
          searchItem = item;
        }
      }
    });

    if (searchItem === undefined) {
      res.status(404);
    } else {
      res.status(201).json(searchItem);
    }

  });
});

module.exports = search;