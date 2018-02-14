var request = require("request");
var express = require('express');
var cheerio = require("cheerio");
var fs = require('fs');
var app     = express();


var contents = fs.readFileSync("michelin.json");

 var lines = String(contents).split(/\n/);
/*
 for each (x in lines) {
   var jsonContent = JSON.parse(lines[1]);
}
*/
 var jsonContent = JSON.parse(lines[1]);
console.log(jsonContent.postCode);


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
