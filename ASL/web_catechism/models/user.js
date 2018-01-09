var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// connect to the database
mongoose.connect('mongodb://localhost/web_catechism');

var db = mongoose.connection;

// define my database schema
var UserSchema = mongoose.Schema({
    email: {
        type: String,
        index: true,
        required: true,  // extra level of require (even though it's already required client-side and server-side)
        unique: true
    },
    password: {
        type: String,
        required: true,  // extra level of require (even though it's already required client-side and server-side)
        bcrypt: true
    },
    progress: Number,
    resetPasswordToken: String,
    resetPasswordExpiry: Number
});

// declare and export User
var User = module.exports = mongoose.model('User', UserSchema);

// define User functions (exporting them)
module.exports.createUser = function(newUser) {
    bcrypt.hash(newUser.password, 10, function(error, hash) {  // @2GHZ single core 10 rounds of hashing means ~ 10hashes / second; 8 would be ~40/second; lower if too processor intensive
        if (error) {
            throw error;
        }
        newUser.password = hash; // set the newUser password to the freshly salted & hashed password

        newUser.save();  // save the user to the database
    });
};

module.exports.matchPassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(error, isMatch) {
        if (error) {
            return callback(error);
        }
        callback(null, isMatch);
    });
};

module.exports.writeProgress = function(user, position) {
    user.progress = position;
    user.save();
};

module.exports.readProgress = function(user) {
    return user.progress;
};

module.exports.getByEmail = function(email, callback) {
    var query = {
        email: {$in: [email]}  // using $in for db injection prevention
    };
    User.findOne(query, callback);
};

module.exports.getById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getByToken = function(token, callback) {
    User.findOne({resetPasswordToken: {$in: [token]}}, callback);  // like all the other findOne functions, but for the token
};

module.exports.genExpiryToken = function(user) {
    user.resetPasswordToken = Math.round((Date.now() * Math.random())).toString(16);  // generate a unique token (current milliseconds, times a random number) converted to base 16
    user.resetPasswordExpiry = Date.now() + 3600000;  // expires in 1 hour
    user.save();

    return user.resetPasswordToken;  // return for the purpose of sending in email
};

module.exports.resetPassword = function(user, password) {
    bcrypt.hash(password, 10, function(error, hash) {  // salt and hash the password
        if (error) {
            throw error;
        }
        user.password = hash; // set the newUser password to the freshly salted & hashed password
        user.resetPasswordToken = undefined;  // since this part of the process means a successful password rest, empty the token
        user.resetPasswordExpiry = undefined;  // since this part of the process means a successful password rest, empty the expiry time
        user.save();
    });
};

module.exports.deleteUser = function(user, callback) {
    User.remove({email: user.email}, callback);
};
