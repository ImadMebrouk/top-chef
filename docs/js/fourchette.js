var request = require("request");
var express = require('express');
var cheerio = require("cheerio");
var fs = require('fs');
var app     = express();


var contents = fs.readFileSync("michelin.json");



 var lines = String(contents).split(/\n/);
 var wrapped =lines.join(",");

  var jsonContent = JSON.parse(wrapped);

  console.log(jsonContent);

/*
 var arr = [];

for(var x in jsonContent){
  arr.push(jsonContent[x]);
}

console.log(arr);
*/

request({uri: "https://www.lafourchette.com/search-refine/Le Violon d'Ingres",}, function(error, response, body) {
        try{
            var $ = cheerio.load(body);

            $(".resultItem").each(function() {
              var link = $(this).find(".resultItem-address");



              if(link.text().includes("75007"))
              {
                  console.log(link.text());
                  var link2 = $(this).find(".resultItem-name > a").attr("href");

                    console.log(link2);
                      request({
                                  uri: "https://www.lafourchette.com"+String(link2),
                                }, function(error, response, body) {
                                  var $ = cheerio.load(body);

                                      $(".saleType--specialOffer").each(function() {
                                        var link = $(this);

                                     var promo =  link.find(".saleType-title").text();
                                     console.log(promo)

                                       });

                                    });

              }



                  });

                }
                catch(e){}
            });
