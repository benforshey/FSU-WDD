var Joi = require('joi');
var Bcrypt = require('bcrypt');
var PouchDB = require('pouchdb');
var APIKey = 'wassnotteeftersityoustes';
var APIPassword = process.env.CLOUDANT_API_PASSWORD;
var TenantDB = new PouchDB('https://' + APIKey + ':' + APIPassword + '@benforshey.cloudant.com/inspection_tech_tennants/');
var MandrillAPI = require('mandrill-api/mandrill');
var MandrillClient = new MandrillAPI.Mandrill('nGsQFKwS9DoJp3Ci30l_iQ');
var Wreck = require('wreck');

exports.register = function(server, options, next) {
    "use strict";
    server.register([
        {
            register: require('hapi-auth-cookie')
        }
    ], function(err) {
        if (err) {
            console.error('Failed to load a plugin:', err);
            throw err;
        }
        // declare my strategy from a scheme
        server.auth.strategy('base', 'cookie', {
            password: process.env.SESSION_PASSWORD,
            isSecure: process.env.NODE_ENV !== 'development',  // "true" for any environment outside of development
            cookie: 'itsid',
            ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
        });
    });

    // make all routes inherit the default base auth strategy; could add default scope of role here
    server.auth.default({
        strategy: 'base'
    });

    server.route({
        method: 'POST',
        path: '/portal',
        config: {
            auth: false,
            validate: {
                payload: {
                    emailAddress: Joi.string().email().required().options({
                        language: {
                            label: 'email address'
                        }
                    }),
                    password: Joi.string().regex(/^(?=.{12,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S*$/).required().options({
                        language: {
                            string: {
                                regex: {
                                    base: 'must at least 12 characters long, contain at least 1 number, one uppercase letter, and one lowercase letter.'
                                }
                            }
                        }
                    })
                },
                options: {
                    abortEarly: false
                },
                failAction: function(request, reply, source, error) {  // input fails Joi validation
                    "use strict";
                    var errors = {},
                        details = error.data.details;
                    for (var i = 0; i < details.length; i += 1) {
                        if (!errors.hasOwnProperty(details[i].path)) {
                            errors[details[i].path] = details[i].message;
                        }
                    }

                    return reply.view('portal.hbs', {
                        title: 'Business Portal | Inspection Tech',
                        statusMessage: errors,
                        messageClass: 'status__invalid',
                        emailClass: errors.emailAddress ? 'input__invalid' : '',
                        passwordClass: errors.password ? 'input__invalid' : '',
                        values: request.payload
                    }).code(400);
                }
            },
            handler: function(request, reply) {
                "use strict";
                var email = request.payload.emailAddress,
                    password = request.payload.password;
                TenantDB.get(email).then(function(doc) {
                    var user = {  // this is for binding the user to the server
                        _id: doc._id,
                        API_key: doc.API_key,
                        API_password: doc.API_password,
                        company_logo: doc.company_logo,
                        company_name: doc.company_name,
                        company_tagline: doc.company_tagline,
                        company_url: doc.company_url,
                        inspector_name: doc.inspector_name,
                        inspector_phone: doc.inspector_phone,
                        internal_uri: doc.internal_uri
                    };
                    var session = {  // this is for setting the session cookie
                        name: doc._id
                    };
                    Bcrypt.compare(password, doc.hash, function(err, res) {
                        if (res) {
                            server.app.user = user;  // bind the user to the server
                            request.auth.session.set(session);  // set the session after a successful login
                            return reply.redirect('/' + server.app.user.internal_uri + '/reports');
                        } else {  // this would be a password failure
                            var message = {
                                password: 'The password did not match.'
                            };
                            return reply.view('portal.hbs', {
                                title: 'Business Portal | Inspection Tech',
                                statusMessage: message,
                                messageClass: 'status__invalid',
                                passwordClass: "input__invalid",
                                values: request.payload
                            }).code(400);
                        }
                    });
                }).catch(function(err) {  // this would be an invalid email address (aka, the _id) returned from the server
                    if (err.status === 404) {
                        var message = {
                            emailAddress: "That email address isn't associated with an account."
                        };
                        return reply.view('portal.hbs', {
                            title: 'Business Portal | Inspection Tech',
                            statusMessage: message,
                            messageClass: 'status__invalid',
                            emailClass: "input__invalid",
                            values: request.payload
                        }).code(400);
                    }
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/portal/password-recovery',
        config: {
            auth: false,
            validate: {
                payload: {
                    emailAddress: Joi.string().email().required().options({
                        language: {
                            label: 'email address'
                        }
                    })
                },
                options: {
                    abortEarly: false
                },
                failAction: function(request, reply, source, error) {  // input fails Joi validation
                    "use strict";
                    var errors = {},
                        details = error.data.details;
                    for (var i = 0; i < details.length; i += 1) {
                        if (!errors.hasOwnProperty(details[i].path)) {
                            errors[details[i].path] = details[i].message;
                        }
                    }
                    return reply.view('passwordRecovery.hbs', {
                        title: 'Password Recovery | Inspection Tech',
                        statusMessage: errors,
                        emailClass: errors.emailAddress ? 'input__invalid' : '',
                        values: request.payload
                    }).code(400);
                }
            },
            handler: function(request, reply) {
                "use strict";
                var email = request.payload.emailAddress,
                    token = Math.round((Date.now() * 1e5 * Math.random())).toString(16);  // long unique string in base 16
                TenantDB.get(email).then(function(doc) {
                    // need to post to /_session to have write permissions
                    console.log(doc);
                    return TenantDB.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        API_key: doc.API_key,
                        API_password: doc.API_password,
                        company_name: doc.company_name,
                        company_tagline: doc.company_tagline,
                        company_url: doc.company_url,
                        hash: doc.hash,
                        inspector_name: doc.inspector_name,
                        inspector_phone: doc.inspector_phone,
                        internal_uri: doc.internal_uri,
                        recovery_token: token,
                        recovery_timer: Date.now() + (60 *  60 * 1000)
                    })
                }).then(function(response) { // email user with token and reset password process
                    MandrillClient.messages.send({
                        "message": {  // send a message through Mandrill
                            "text": "Someone (hopefully you) requested a password reset on your account, so I've emailed you a password reset token that expires within 1 hour. \n\nThe token to reset your password is: " + token + "\n\nPlease go to www.inspection.tech/portal/password-recovery/reset and enter this token within 1 hour to reset your password. If you do nothing the token will expire and your password will not be reset. You may always request a password reset at another time. \n\nRegards,\nInspection Tech Support",
                            "subject": "Password Reset Token from Inspection Tech",
                            "from_email": "support@inspection.tech",
                            "from_name": "Inspection Tech",
                            "to": [{
                                "email": email,
                                "type": "to"
                            }],
                            "important": true
                        }
                    }, function(result) {  // MandrillClient did not throw an error
                        var message = {};
                        if (result[0].status === 'sent' && response.ok === true) {  // success result from Mandrill and CouchDB
                            message = {
                                mandrillStatus: "Your password recovery email has been successfully sent. Check your email for the recovery token and password reset link."
                            };
                            return reply.view('passwordRecovery.hbs', {
                                title: 'Password Recovery | Inspection Tech',
                                statusMessage: message,
                                messageClass: 'status__valid',
                                values: request.payload
                            });
                        } else {  // this would be something causing a status other than 'sent' to return from Mandrill or 'response.ok === true' from CouchDB
                            message = {
                                mandrillStatus: "There may have been an error sending your recovery email. If your recovery email doesn't appear, please try the recovery process again or contact support@inspection.tech to recover your account password."
                            };
                            return reply.view('passwordRecovery.hbs', {
                                title: 'Password Recovery | Inspection Tech',
                                statusMessage: message,
                                messageClass: 'status__invalid',
                                values: request.payload
                            }).code(400);
                        }
                    }, function(err) {  // MandrillClient threw an error
                        if (err) {
                            console.error('An error occurred with Mandrill: ' + err.name + ' - ' + err.message);
                            var message = {
                                mandrillStatus: "There was an error sending your recovery email. Please try the recovery process again or contact support@inspection.tech to recover your account password. Please include the error message below in your email.",
                                mandrillError: err.name + " - " + err.message
                            };
                        }
                        return reply.view('passwordRecovery.hbs', {
                            title: 'Password Recovery | Inspection Tech',
                            statusMessage: message,
                            messageClass: 'status__invalid',
                            values: request.payload
                        }).code(400);
                    });
                }).catch(function(err) { // this would be an invalid email address (aka, the _id) returned from the server
                    if (err.status === 404) {
                        var message = {
                            emailAddress: "That email address isn't associated with an account."
                        };
                        return reply.view('passwordRecovery.hbs', {
                            title: 'Password Recovery | Inspection Tech',
                            statusMessage: message,
                            messageClass: 'status__invalid',
                            emailClass: "input__invalid",
                            values: request.payload
                        }).code(400);
                    }
                });

            }
        }
    });

    server.route({
        method: 'POST',
        path: '/portal/password-recovery/reset',
        config: {
            auth: false,
            validate: {
                payload: {
                    emailAddress: Joi.string().email().required().options({
                        language: {
                            label: 'email address'
                        }
                    }),
                    token: Joi.string().required(),
                    password: Joi.string().regex(/^(?=.{12,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S*$/).required().options({
                        language: {
                            string: {
                                regex: {
                                    base: 'must at least 12 characters long, contain at least 1 number, one uppercase letter, and one lowercase letter.'
                                }
                            }
                        }
                    })
                },
                options: {
                    abortEarly: false
                },
                failAction: function(request, reply, source, error) {  // input fails Joi validation
                    "use strict";
                    var errors = {},
                        details = error.data.details;
                    for (var i = 0; i < details.length; i += 1) {
                        if (!errors.hasOwnProperty(details[i].path)) {
                            errors[details[i].path] = details[i].message;
                        }
                    }
                    return reply.view('passwordReset.hbs', {
                        title: 'Password Reset | Inspection Tech',
                        statusMessage: errors,
                        emailClass: errors.emailAddress ? 'input__invalid' : '',
                        passwordClass: errors.password ? 'input__invalid' : '',
                        tokenClass: errors.token ? 'input__invalid' : '',
                        values: request.payload
                    }).code(400);
                }
            },
            handler: function(request, reply) {
                "use strict";
                var email = request.payload.emailAddress,
                    password = request.payload.password,
                    token = request.payload.token;
                Bcrypt.genSalt(10, function(err, salt) {  // generate the new salt and send to hash
                    Bcrypt.hash(password, salt, function(err, hash) {  // generate salted hash
                        if (err) {
                            throw err;
                        }
                        TenantDB.get(email).then(function(doc) {  // first fetch the document
                            var now = Date.now();
                            if (doc.recovery_token === token && now <= doc.recovery_timer) {  // this means that the fetched token equals the posted token and 1 hour has not passed
                                return TenantDB.put({  // by not putting the recovery_token and recovery_timer, clear them from the DB
                                    _id: doc._id,
                                    _rev: doc._rev,
                                    API_key: doc.API_key,
                                    API_password: doc.API_password,
                                    company_name: doc.company_name,
                                    company_tagline: doc.company_tagline,
                                    company_url: doc.company_url,
                                    hash: hash,
                                    inspector_name: doc.inspector_name,
                                    inspector_phone: doc.inspector_phone,
                                    internal_uri: doc.internal_uri
                                });
                            } else {  // this would be an expired or invalid token
                                var message = {
                                    tokenFailure: 'Sorry, the token was expired or invalid. Recovery tokens only last 1 hour. You can always send yourself another recovery token or email support@inspection.tech for assistance.'
                                };
                                return reply.view('passwordRecovery.hbs', {
                                    title: 'Password Recovery | Inspection Tech',
                                    statusMessage: message,
                                    messageClass: 'status__invalid',
                                    tokenClass: 'input__invalid',
                                    values: request.payload
                                }).code(400);
                            }
                        }).then(function(response) {
                            var message = {};
                            if (response.ok === true) {  // good response from server
                                message.passwordReset = "Your password has been successfully rest. Please log in with your new password.";
                                return reply.view('portal.hbs', {
                                    title: "Business Portal | Inspection Tech",
                                    statusMessage: message,
                                    messageClass: 'status__valid'
                                });
                            } else {  // some response other than 'response.ok === true' from CouchDB
                                message.serverStatus = "There may have been an error resetting your password. Please try the recovery process again or contact support@inspection.tech to recover your account password.";
                                return reply.view('passwordRecovery.hbs', {
                                    title: 'Password Recovery | Inspection Tech',
                                    statusMessage: message,
                                    messageClass: 'status__invalid',
                                    values: request.payload
                                }).code(400);
                            }
                        }).catch(function(err) {  // this would be an invalid email address (aka, the _id) returned from the server
                            if (err.status === 404) {
                                var message = {
                                    emailAddress: "That email address isn't associated with an account."
                                };
                                return reply.view('passwordRecovery.hbs', {
                                    title: 'Password Recovery | Inspection Tech',
                                    statusMessage: message,
                                    messageClass: 'status__invalid',
                                    emailClass: "input__invalid",
                                    values: request.payload
                                }).code(400);
                            }
                        });
                    });
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        config: {
            auth: false,
            handler: function(request, reply) {
                "use strict";
                request.auth.session.clear();
                return reply.redirect('/');
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'auth'
};
