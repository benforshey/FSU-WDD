var http = require('http');  // add the node http module
var myServer = http.createServer(function (request, response) {  // create a server
    response.writeHead(200, {
        "Content-Type" : "text/html"
    });
    response.write("You just got served (Oh, and '<b>Hello World</b>')!");
    response.end();
});

myServer.listen(3000);

console.log("Go to http://localhost:3000");