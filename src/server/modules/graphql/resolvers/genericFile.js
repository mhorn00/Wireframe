var { Query } = require('mongoose');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = require('../../../secret');
var hasher = require('../../hasher')
var _path = require('path')
var usersPath = __dirname + "../../../../../../users/";
var GenericFile = require('../../mongo/schemas/data/genericFile');
var uuid = require('uuid');

// TODO: make secret file

async function removeSubitems(username, path, name) {
    // items in this folder path should all removed - all folders within it should have theirs removed also
    console.log(path + name + '/');
    GenericFile.find({ uploader: username, userRelativePath: path + name }).then((files) => {
        console.log(files)
        files.forEach((e) => {
            if (e.type == 'dir') {
                removeSubitems(`${e.userRelativePath}/${e.name}/`).then(() => e.remove());
            }
            else {
                fs.unlinkSync(_path.resolve(`${usersPath}${username}/${e.name}`));
                e.remove();
            }
        })
    })
}

async function checkFolderName(name, username, path){
    GenericFile.find({uploader: username, type:"dir", path: path, })
}

var resolvers = {
    Query: {
        files: async function (parent, args, { GenericFile }) {
            // given args.path, find all top level files and return array of paths
            //TODO: make this a promise
            return await new Promise((resolve, reject) => {
                var info;
                try {
                    info = jwt.verify(args.token, secret);
                    // goes from this files directory to the root of the workspace directory
                    //var gpath = _path.resolve(usersPath + info.Username + '/' + args.path);
                    GenericFile.find({ uploader: info.Username, userRelativePath: args.path == '' ? '/' : args.path }).then((files) => {
                        resolve(files);
                    })
                }
                catch (e) {
                    reject(e);
                }
            });
        },
        folders: async function (parent, args, { GenericFile }) {
            // TODO: make folders seperate??? Or just have them in the same database??
            return await new Promise((resolve, reject) => {

            })
        },
        file: async function (parent, args, { GenericFile }) {

            return {};
        }
    },
    Mutation: {
        addFile: async function (parent, args, { GenericFile }) {
            /* yes */
            return true;
        },
        addFolder: async function (parent, args, { GenericFile }) {
            // path is in terms from user root directory
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    var folder = new GenericFile({
                        absolutePath: null,
                        userRelativePath: args.path == 'undefined' ? '/' : args.path,
                        name: args.name,
                        uploader: info.Username,
                        type: "dir"
                    })
                    GenericFile.find({ userRelativePath: args.path, name: args.name, uploader: info.Username }).then((res) => {
                        if (res != null) {
                            folder.name = folder.name + "_";
                        }
                        folder.save().then((e) => { console.log(e); resolve(true) }).catch((e) => resolve(false));
                    })

                }
                catch (e) {
                    throw (e);
                    resolve(false);
                    return;
                }
            });
        },
        remove: async function (parent, args, { GenericFile }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    if (args.path == 'undefined') args.path = '';
                    GenericFile.find({ userRelativePath: args.path === '' ? '/' : args.path, name: args.name }).then((res) => {
                        res.forEach(element => {
                            if (element.type == 'dir') {
                                removeSubitems(element.uploader, element.userRelativePath, element.name).then(() => {
                                    element.remove();
                                    resolve(true);
                                });
                            }
                            else {
                                try {
                                    fs.unlinkSync(_path.resolve(__dirname + `../../../../../../users/${element.uploader}/${element.path === undefined ? '/' : element.path}/${element.name}`));
                                    element.remove().then(() => resolve(true));
                                }
                                catch (e) {
                                    if (e.code == 'ENOENT') {
                                        element.remove().then(() => resolve(true));
                                    }
                                    else resolve(false);
                                }
                            }
                        });
                    })
                }
                catch (e) {
                    throw (e);
                    resolve(false);
                }
            })
        },
        generateLink: async function(parent, args, {GenericFile}){
            return await new Promise((resolve,reject)=>{
                try{
                    var info = jwt.verify(args.token, secret);
                    console.log(args);
                    GenericFile.findOne({uploader:info.Username, userRelativePath: args.path==''?'/':args.path, name: args.name}).then((file)=>{
                        console.log(file);
                        var url = uuid.v4(3);
                        file.sharing_links.push(url);
                        file.save().then((res)=>resolve(url));
                    })
                }
                catch(e){
                    resolve(false);
                }
            });
        }
    }
}

module.exports = resolvers;