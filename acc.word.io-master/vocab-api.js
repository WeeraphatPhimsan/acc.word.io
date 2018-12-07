var fs = require('fs');
var express = require('express');
var app = express();
 fs.readFile("vocab.txt",function(err,data)
	{
		if(err){
			console.log(err.stack);
			return 0;
		}
    console.log(data);
	var jsonVocab = JSON.parse(data);
	app.get('/',function(req,res){
		res.sendfile(file);
    
	});
	});

var server = app.listen(8080, function(){
	console.log("Example app listening at http://127.0.0.1:8080");
});