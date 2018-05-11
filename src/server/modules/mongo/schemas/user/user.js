var {
    Schema
} = require('mongoose');
var uuid = require('uuid');
var {
    FolderSchema
} = require('../data/genericFile');

//console.log(FolderSchema);

let User = new Schema({
    username: !String,
    email: !String,
    registrationHash: {
        type: String,
        default: function () {
            return `${uuid.v4()}`
        }
    },
    hashedPass: !String,
    creationDate: !Date,
    approved: {
        type: Boolean,
        default: false
    },
    rootFolder: String
})

module.exports = mongo.model('User', User);