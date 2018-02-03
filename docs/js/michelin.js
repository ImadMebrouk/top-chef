var request = require("request");
var express = require('express');
var cheerio = require("cheerio");
var fs = require('fs');
var app     = express();


for(var i=1; i<=14;i++){
request({uri: "https://restaurant.michelin.fr/instants-michelin?page="+String(i),}, function(error, response, body) {
            var $ = cheerio.load(body);

            $(".poi-card-link").each(function() {
              var link = $(this);
              var href = link.attr("href");

              request({
                          uri: "https://restaurant.michelin.fr"+String(href),
                        }, function(error, response, body) {
                          var $ = cheerio.load(body);
                          var json = { title : "", address:"", postCode:""};



                              $(".poi_intro-display-title").each(function() {
                                var link = $(this);
                               var title = link.text();
                               title = title.substring(7, (title.length -4));
                                json.title = title;

                               });

                               $(".thoroughfare").each(function() {
                                 var link = $(this);
                                var address = link.text();
                                 json.address = address;

                                });

                               $(".postal-code").each(function() {
                                 var link = $(this);
                                var postCode = link.text();
                                 json.postCode = postCode;

                                });


                                    fs.appendFile('michelin.json', JSON.stringify(json, null, 4), function(err){
                                    console.log('File successfully written! - Check your project directory for the output.json file');

                          });

                            });




                  });
            });
    }





  //Second request (for each link)
