var mongoose = require('mongoose');
global.mongo = mongoose.createConnection('mongodb://localhost:27017');
var GenericFile = require('../modules/mongo/schemas/data/genericFile');

var file = new GenericFile({
    userRelativePath: ['', '5af24809537861548b3f5d46'],
    rawName: 'subfolder',
    uploader: 'h',
    name: 'subfolder',
    type: 'dir',
    fileSize: 2321
})

file.save();