//  Description:
//    Hooks Hubot into Cleverbot via cleverbot.io API.
//
//  Dependencies:
//    cleverbot.io node module
//
//  Configuration:
//    None
//
//  Commands:
//    @hubot <your conversation with hubot / cleverbot>
//
//  Author:
//    Ben Forshey

module.exports = function(robot) {  // export the function as a module
    var cleverBot = require('cleverbot.io'),
        userAPI = process.env.CLEVERBOT_API_USER,  // API user ID as an environmental variable (since public repository)
        keyAPI = process.env.CLEVERBOT_API_KEY,  // API key as an environmental variable (since public repository)
        persona = new cleverBot(userAPI, keyAPI);

    persona.setNick('WDD-Hubot');  // give the session a name

    persona.create(function(err, session) {  // create new instance
        if (err) {  // handle an error with session name info
            console.error('Error in Session ' + session);
            throw err;
        }
    });

    robot.hear(/@hubot (.*)/i, function(res) {
        var message = res.match[1];  // stores into message the string after "@hubot"
        persona.ask(message, function(err, response) {
            if (err) {  // handle and error by throwing an exception
                throw err;
            }
            return res.send(response);  // send cleverbot's response
        });
    });
};
