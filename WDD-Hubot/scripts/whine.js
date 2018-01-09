// Description:
// Hubot calls you out for whining.
//
// Dependencies:
// Request
//
// Configuration:
// None
//
// Commands:
// Hubot whine - Triggers when you use certain words. EX: boring|too hard|tired
//
// Author:
// Devin Metivier

//Messages/images to be displayed randomly
var messages = [
    "Panzy.",
    "We got a whiner!",
    "http://www.quickmeme.com/img/49/49a360b15c4a1e03684be8bbbbf8d62b3047524a11cafbde92ba39b410937e9c.jpg",
    "http://cdn.meme.am/instances/56695231.jpg",
    'Sounds like a "you" problem...',
    "http://s2.quickmeme.com/img/d1/d13ef5e2faa095ac70bbbdf3b0c426852975e79e4d30cc380e6a3e7742546e9f.jpg",
    "http://winningateverything.com/files/2011/12/WA_nowhining.jpg",
    "http://s2.quickmeme.com/img/6a/6ae2a7263358d32d4cfa50205b87a5f00452941b0770eacd82df82d8428e0fc3.jpg",
    "http://www.kappit.com/img/pics/59314520cfdgb.jpg"
];

var callYouOut = function(msg){
    keyword = msg; //keyword inside message

    if (keyword){
        //if there is a keyword present in someone's message send random message/image in array
        msg.send(msg.random(messages));
    }//end if statement
};//end function

module.exports = function (robot) {
    return robot.hear(/\b(boring|bored|to hard| too hard|tired|tiring)\b/i, function(msg){
        callYouOut(msg); //function call
    });
};