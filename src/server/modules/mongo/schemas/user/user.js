var { Schema } = require('mongoose');
var uuid = require('uuid');

let User = new Schema({
    username: !String,
    email: !String,
    registrationHash: {
        type: String,
        default: function(){return `${uuid.v4()}`}
    },
    hashedPass: !String,
    creationDate: !Date,
    approved: {
        type: Boolean, default: false
    }
})

module.exports = mongo.model('User', User);