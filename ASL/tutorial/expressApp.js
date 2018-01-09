var express = require('express');
var app = express();  // app is not a reserved variable; could call it anything, but sticking with convention
var routes = require('./routes');

app.set('view engine', 'ejs');  // sets the view engine to EJS
//app.set('views', __dirname + '/my_custom_views_folder');  // if I wanted to set a custom views folder... also, __dirname is a global variable where root is relative to the calling file

app.locals.pagetitle = "My Awesome Website";  // a variable that can be passed to across templates
app.locals.content = require('./content.json');
app.locals.currentIndex = 1;

app.get('/', routes.index);

app.get('/about', routes.about);

app.get('*', routes.fourOhFour);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening on http://%s%s', host, port);
});
