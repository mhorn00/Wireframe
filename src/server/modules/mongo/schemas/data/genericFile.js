var mongoose = require('mongoose');
var {Schema} = mongoose;

let File = new Schema({
    absolutePath: String,
    userRelativePath: !String,
    rawName: String,
    uploader: !String,
    name: !String,
    type: String,
    uploadDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    fileSize: Number,
    sharing_links: [String]
})

module.exports = mongo.model('File',File);