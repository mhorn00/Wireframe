var mongoose = require('mongoose');
var {Schema} = mongoose;

let File = new Schema({
    absolutePath: String,
    rawName: String,
    name: !String,
    type: String,
    parentId: !String,
    uploadDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    fileSize: Number,
    sharing_links: [String],
    owner: !String
})

let Folder = new Schema({
    name: String,
    parentId: String,
    owner: String,
    type: {
        type: String,
        default: '|dir|'
    },
    makeDate: {
        type: Date,
        default: Date.now()
    },
    children: [{
        childName: String,
        childType: String,
        childId: String
    }] // Mixed array so that both files and folders may be children 

    /*
        children: [{

        }]
    */
})

let FolderModel = mongo.model('Folder',Folder);
let FileModel = mongo.model('File', File)
module.exports = {GenericFile:FileModel,Folder: FolderModel, FolderSchema: Folder};