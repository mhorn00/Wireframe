var mongoose = require('mongoose');
var {Schema} = mongoose;

let File = new Schema({
    absolutePath: String,
    rawName: String,
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

let Folder = new Schema({
    name: String,
    path: [String],
    owner: String,
    name: String,
    makeDate: {
        type: Date,
        default: Date.now()
    },
    children: [] // Mixed array so that both files and folders may be children 
})

let FolderModel = mongo.model('Folder',Folder);
let FileModel = mongo.model('File', File)
module.exports = {File:FileModel,Folder: FolderModel, FolderSchema: Folder};

let Test = new FolderModel({
    name: 'classic number 2',
    path: [''],
    owner: 'me bitch',
})

Test.save().then(()=>{
    Test.children.push(new FolderModel({
        name:'i am le nested foler 1',
        children: [new FolderModel({
            name: 'i am le nested foler number 2',
            children: [new FileModel({
                name: 'HI !!!'
            })]
        })]
    }))
    Test.save().then(()=>console.log('hey that is AWESOME'))
})