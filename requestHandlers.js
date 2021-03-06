var querystring = require("querystring");//文件数据处理的模块
var formidable = require("formidable");//文件上传的模块
var fs=require("fs");//文件读取到服务器中

function start (response) {
	console.log("Request handler 'start' was called ");

	var body='<html>'+
	'<head>'+
	'<meta http-equiv="uploadContent-Type" content="text/html:'
	+'charset=UTF-8"/>'
	+'</head>'+
	'<body>'+
	'<form action="/upload" method="post" enctype="multipart/form-data">'
	+'<input type="file" name="upload">'
    +'<input type="submit" value="Submit text" />'
    +'</form>'+
    '</body>'+
    '</head>'+
    '</html>'; 

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();   
}

function upload(response,request) {
	console.log("Request handler 'upload' was called ");
	
	var form = new formidable.IncomingForm();
	console.log("about to parse");

    form.uploadDir="./tmp";//必须设置

	form.parse(request,function(error,fields,files){
		console.log("parsing done");
		console.log(files);
		fs.renameSync(files.upload.path,"/tmp/test.png");//重命名
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("received image:<br>/");
		response.write("<img src='/show' />");
		response.end();
	})	
}

function show(response){
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.png",'binary',function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();
		}else{
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	})
}
exports.start=start;
exports.upload=upload;
exports.show=show;