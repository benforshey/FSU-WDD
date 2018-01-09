//var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    port: 3001,
    router: {
        stripTrailingSlash: true
    }
});

// Export the server to be required elsewhere.
//module.exports = server;

// load community plugins, then my specific plugins
server.register([{
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                ops: '*',
                request: '*',
                log: '*',
                response: '*',
                'error': '*'
            }
        }]
    }
}, {
    register: require('vision')
}, {
    register: require('./handlers/noAuth.js')
}, {
    register: require('./handlers/login.js')
}, {
    register: require('./handlers/auth.js')
}], function(err) {  // error handling and server start in callback
    if (err) {
        throw err;
    }
    // configure view engine ('vision' is needed for this)
    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views',
        partialsPath: './views/partials',
        helpersPath: './views/helpers',
        isCached: process.env.NODE_ENV !== 'development' // "true" for any environment outside of development
    });

    server.start(function() {
        console.log('server running at: ', server.info.uri);
    });

});
