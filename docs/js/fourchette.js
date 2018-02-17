var request = require("request");
var express = require('express');
var cheerio = require("cheerio");
var fs = require('fs');
var app     = express();


var contents = fs.readFileSync("michelin.json");

var lines = String(contents).split(/\n/);

 for(var i =1; i < lines.length -1;i++){
     var jsonContent = JSON.parse(lines[i]);

     let ntitle = jsonContent.title;
     let npostcode = jsonContent.postCode;

     request({uri: "https://www.lafourchette.com/search-refine/"+String(ntitle),}, function(error, response, body) {
             try{
                 var $ = cheerio.load(body);
                 let json = { title : "", promo:""};

                 $(".resultItem").each(function()
                  {
                       let link = $(this).find(".resultItem-address");
                      // console.log(link.text());
                       if(String(link.text()).includes(String(npostcode)))
                       {
                          // console.log("test");

                          var link2 = $(this).find(".resultItem-name > a").attr("href");
                          json.title = ntitle;
                          //  console.log(link2);
                          request({uri: "https://www.lafourchette.com"+String(link2),}, function(error, response, body)
                                  {
                                       var $ = cheerio.load(body);

                                       $(".saleType--specialOffer").each(function()
                                       {
                                         var link = $(this);
                                        let promo = link.find(".saleType-title").text();
                                        if(promo != "")
                                        {
                                          json.promo = promo;
                                           fs.appendFile('fourchette.json', JSON.stringify(json)+"\r\n", function(err){ });

                                        }

                                        });



                                    });

                        }



                     });

               }
                     catch(e){}
                 });
  }
