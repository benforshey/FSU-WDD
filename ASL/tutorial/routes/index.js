exports.index = function(reqeust, response) {  // exports routes so callable from expressApp.js
    response.render('default', {
        title: "My Express App",
        banner: "You've Arrived!",
        sectionTheme: "default"  // using as body class name for theme purposes
    });  // sending var to template as object
};

exports.about = function(reqeust, response) {  // exports routes so callable from expressApp.js
    response.render('default', {
        title: "About Us",
        banner: "Team...Team, Team, Team",
        sectionTheme: "about",  // using as body class name for theme purposes
        users: [
            'Ben',
            'Susi',
            'Violet',
            'Gracie',
            'Miles'
        ]
    });  // sending var to template as object
};

exports.fourOhFour = function(req, res) {
    res.send("This is a 404 message.");
};

// Legacy Code (when routes were in expressApp.js)
//
//app.get('/about/:name?', function(req, res) {  // making a different route, using request parameter array
//    var name = req.params.name;
//    res.send(name + " has been called here.");
//});
//
//app.get('/about/:foo?/:bar?', function(req, res) {  // making a different route, using request parameters array
//    var names = req.params.foo;  // named nonsensically (was name) to see if params were reserved keywords
//    var title =req.params.bar;  // name nonsensically (was title) to see if params were reserved keywords
//
//    res.send("<p>" + names + " , a "+ title + " has been called here.</p>");
//});
//
//app.get('*', function(req, res) {  // order is important; this must be last
//    res.send('This is pretty much a 404');
//});