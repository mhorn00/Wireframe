var mongoose = require('mongoose');
global.mongo = mongoose.createConnection('mongodb://localhost:27017');
var GenericFile = require('../modules/mongo/schemas/data/genericFile');

var file = new GenericFile({
    userRelativePath: '/',
    rawName: 'test.jsx',
    uploader: 'h',
    name: 'tyeyeyy',
    type: 'asm',
    fileSize: 2321
})

file.save();