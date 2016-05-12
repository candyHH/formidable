function route (handle,pathname,response,request) {
	console.log("About to route a request for"+pathname);
	//判断 handle[pathname]的类型是不是函数
	if(typeof handle[pathname]==='function'){
		//执行相对应的
		handle[pathname](response,request);
	}else{
		console.log("No request handler found for"+pathname);
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;