var Joi = require('joi');
var MandrillAPI = require('mandrill-api/mandrill');
var MandrillClient = new MandrillAPI.Mandrill('nGsQFKwS9DoJp3Ci30l_iQ');

exports.register = function(server, options, next) {
    "use strict";

    server.route({
        method: 'GET',
        path: '/integrous-web/dashboard',
        config: {
            handler: function(request, reply) { // temporary redirect until dashboard is created
                "use strict";
                if (!server.app.user) {  // the server has been restarted, losing the config object with essential user information; need to log in again
                    return reply.redirect('/portal');
                }
                reply.redirect('/' + server.app.user.internal_uri + '/reports');  // temporary redirect; leaving room for user dashboard
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/integrous-web/reports',
        config: {
            handler: function(request, reply) {
                "use strict";
                //if (request.params.internal_uri === server.app.user.internal_uri) {  // very clunky parameter validation
                if (!server.app.user) {  // the server has been restarted, losing the config object with essential user information; need to log in again
                    return reply.redirect('/portal');
                }
                    reply.view('reports.hbs', {
                        title: "Reports | Inspection Tech",
                        company_logo: server.app.user.company_logo,
                        company_name: server.app.user.company_name,
                        company_tagline: server.app.user.company_tagline,
                        company_url: server.app.user.company_url,
                        inspector_email: server.app.user._id,
                        inspector_name: server.app.user.inspector_name,
                        inspector_phone: server.app.user.inspector_phone,
                        internal_uri: server.app.user.internal_uri
                    });
                //} else {
                //    return reply.redirect('/' + server.app.user.internal_uri + '/reports');
                //}

            }
        }
    });


    server.route({
        method: 'GET',
        path: '/integrous-web/reports/generator',
        config: {
            handler: function(request, reply) {
                "use strict";
                //if (request.params.internal_uri === server.app.user.internal_uri) {  // very clunky parameter validation
                if (!server.app.user) {  // the server has been restarted, losing the config object with essential user information; need to log in again
                    return reply.redirect('/portal');
                }
                    reply.view('generator.hbs', {
                        title: "Generate Report | Inspection Tech",
                        company_logo: server.app.user.company_logo,
                        company_name: server.app.user.company_name,
                        company_tagline: server.app.user.company_tagline,
                        company_url: server.app.user.company_url,
                        inspector_email: server.app.user._id,
                        inspector_name: server.app.user.inspector_name,
                        inspector_phone: server.app.user.inspector_phone,
                        internal_uri: server.app.user.internal_uri,
                        today: new Date().toISOString().slice(0, 10)  // ToDo: localize (perhaps central USA?)
                    });
                //} else {
                //    return reply.redirect('/' + server.app.user.internal_uri + '/reports/generator');
                //}


            }
        }
    });

    server.route({
        method: 'POST',
        path: '/integrous-web/reports/generator',
        config: {
            validate: {
                payload: {
                    email: Joi.array().items(Joi.object().keys({
                        email: Joi.string().email()
                    })),
                    link: Joi.string().uri()
                },
                options: {
                    abortEarly: false
                },
                failAction: function(request, reply, source, error) {  // input fails Joi validation
                    "use strict";

                    return reply(error);
                }
            },
            handler: function(request, reply) {
                "use strict";

                var email = request.payload.email;
                var link = request.payload.link;

                MandrillClient.messages.send({
                    "message": {  // send a message through Mandrill
                        "html": "<p>Hello!<br><br>" + server.app.user.inspector_name + " from " + server.app.user.company_name + " sent you an inspection report using Inspection Tech. You can access and share your report using the following link:<br><br><a href='" + link + "'>" + link + "</a><br><br>If you have any questions about the report, " + server.app.user.inspector_name + " can be reached at " + server.app.user._id + ".\n\nRegards,\n\np.p. Inspection Tech\n" + server.app.user.inspector_name + "</p>",
                        "subject": "Inspection Report from " + server.app.user.company_name,
                        "from_email": "support@inspection.tech",
                        "from_name": "Inspection Tech",
                        "to": email,
                        "important": false
                    },
                    "async": true
                }, function(result) {  // MandrillClient did not throw an error
                    return reply(result);

                }, function(err) {  // MandrillClient threw an error
                    if (err) {
                        console.error('An error occurred with Mandrill: ' + err.name + ' - ' + err.message);

                        return reply(err);
                    }
                });
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'reports'
};
