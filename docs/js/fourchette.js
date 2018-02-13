var request = require("request");
var express = require('express');
var cheerio = require("cheerio");
var fs = require('fs');
var app     = express();

var contents;
var jsonContent;

var contents = fs.readFileSync("michelin.json");

 var jsonContent = JSON.parse(contents);

 console.log(jsonContent.title);

/*
request({uri: "https://www.lafourchette.com/search-refine/Le Violon d'Ingres",}, function(error, response, body) {
            var $ = cheerio.load(body);

            $(".resultItem-name").each(function() {
              var link = $(this);
              var href = link.attr("href");
              var title = link.text();
              console.log(title);

              request({
                          uri: "https://www.lafourchette.com"+String(href),
                        }, function(error, response, body) {
                          var $ = cheerio.load(body);
                          var json = { title : "", address:"", postCode:""};



                              $(".restaurantSummary-name").each(function() {
                                var link = $(this);
                                var title = link.text();
                                json.title = title;

                              console.log(title)

                               });

                            });




                  });
            });
*/
