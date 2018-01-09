var Joi = require('joi');
var PouchDB = require('pouchdb');
var ReportDB = new PouchDB('http://localhost:5984/integrous_web/');  // todo: consider making dynamically assigned vs hard-coding for each client

exports.register = function(server, options, next) {
    "use strict";

    server.register([
            {
                register: require('inert')
            }
    ], function(err){
        if (err) {
            console.error('Failed to load a plugin:', err);
            throw err;
        }
    });

    server.route({
        method: 'GET',
        path: '/',  // temporary index page; could be used for marketing later
        config: {
            auth: false,
            handler: function(request, reply) {
                "use strict";

                reply.redirect('/portal');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/portal',
        config: {
            auth: false,
            handler: function(request, reply) {
                "use strict";
                return reply.view('portal.hbs', {
                    title: 'Business Portal | Inspection Tech'
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/portal/email-recovery',
        config: {
            auth: false,
            handler: function(request, reply) {
                "use strict";
                return reply.view('emailRecovery.hbs', {
                    title: 'Email Recovery | Inspection Tech',
                    businessName: encodeURIComponent(request.params.user)
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/portal/password-recovery',
        config: {
            auth: false,
            handler: function(request, reply) {
                "use strict";
                return reply.view('passwordRecovery.hbs', {
                    title: 'Password Recovery | Inspection Tech'
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/portal/password-recovery/reset',
        config: {
            auth: false
        },
        handler: function(request, reply) {
            "use strict";
            return reply.view('passwordReset.hbs', {
                title: 'Password Reset | Inspection Tech'
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{internal_uri}/reports/{ISO}',  // company name currently hard-coded; debating automating or coding for each client
        config: {
            auth: false,
            validate: {
                params: {
                    internal_uri: Joi.string(),
                    ISO: Joi.string().isoDate()
                }
            }
        },
        handler: function (request, reply) {
            "use strict";
            ReportDB.get(request.params.ISO).then(function (doc) {
                server.app.report = doc;  // bind the report to the server
                return reply.view('report.hbs', {
                    title: 'View Report | Inspection Tech',
                    report: server.app.report
                });
            }).catch(function (err) {
                console.log(err);  // todo: implement logErrorInDB function
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            auth: false,
            handler: {
                directory: {
                    path: './public',
                    redirectToSlash: false,
                    index: false
                }
            }
        }
    });

    next();
};

exports.register.attributes = {
  name: 'noAuth'
};
