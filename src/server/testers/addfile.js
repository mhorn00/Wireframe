var mongoose = require('mongoose');
global.mongo = mongoose.createConnection('mongodb://localhost:27017');
var GenericFile = require('../modules/mongo/schemas/data/genericFile');

var file = new GenericFile({
    userRelativePath: '/',
    rawName: 'test.jsx',
    uploader: 'h',
    name: 'test',
    type: 'asm',
    fileSize: 102020130
})

file.save().then(res=>console.log(res));