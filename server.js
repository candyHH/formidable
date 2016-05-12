var http = require("http");//请求node.js自带的http模块，
var url =require("url");

//调用http模块提供的函数：createServer
//函数有一个返回对象
//对象调用一个listen方法，指定服务器监听的端口号
/*http.createServer(function  (request,responce) {
	responce.writeHead(200,{"Content-Type":"text/plain"});
	responce.write("Hello World");
	responce.end();
}).listen(8888);*/

function start (route,handle) {
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;//获得url的路径
		console.log("Request for"+pathname+" received");		
		route(handle,pathname,response,request);//请求处理程序，路径传递到路由中	
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
}

exports.start=start;//导出函数
