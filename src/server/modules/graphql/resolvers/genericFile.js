var {
    Query
} = require('mongoose');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = require('../../../secret');
var hasher = require('../../hasher')
var _path = require('path')
var usersPath = __dirname + "../../../../../../users/";
var GenericFile = require('../../mongo/schemas/data/genericFile');
var uuid = require('uuid');
var bb = require('bluebird');

async function removeSubitems(username, path, name) {
    // items in this folder path should all removed - all folders within it should have theirs removed also
    GenericFile.find({
        uploader: username,
        userRelativePath: path + name
    }).then((files) => {
        files.forEach((e) => {
            if (e.type == 'dir') {
                removeSubitems(`${e.userRelativePath}/${e.name}/`).then(() => e.remove());
            } else {
                fs.unlinkSync(_path.resolve(`${usersPath}${username}/${e.name}`));
                e.remove();
            }
        })
    })
}

async function checkFolderName(name, username, path) {
    GenericFile.find({
        uploader: username,
        type: "dir",
        path: path,
    })
}

var resolvers = {
    Query: {
        files: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                var info;
                try {
                    info = jwt.verify(args.token, secret);
                    console.log(args);
                    GenericFile.find({
                        uploader: info.username,
                        userRelativePath: args.path
                    }).then((files) => {
                        resolve(files);
                    })
                } catch (e) {
                    reject(e);
                    resolve(null)
                }
            });
        },
        file: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    GenericFile.findOne({
                        _id: args._id
                    }).then((res) => {
                        if (res) resolve(res);
                        resolve(null);
                    })
                } catch (e) {
                    resolve(false);
                }
            })
        },
        getCrumbs: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    var fileParents = [];
                    var resultNames = [];
                    if (args._id == '') {
                        resolve(null);
                        return;
                    } else { }
                    GenericFile.findOne({
                        _id: args._id
                    }).then(res => {
                        fileParents = res.userRelativePath;
                        var promises = [];
                        var parentNames = [];
                        fileParents.forEach(parentId => {
                            if (parentId !== '') {
                                var prom = GenericFile.findOne({
                                    _id: parentId
                                }).then(res => resultNames.push({
                                    name: res.name,
                                    _id: res._id
                                }));
                                promises.push(prom);
                            }
                            else {
                                console.log('hey im good homie');
                                var prom = GenericFile.find({
                                    uploader: info.username,
                                    userRelativePath: ['']
                                });
                                promises.push(prom);
                            }

                        })
                        console.log('i am promises');
                        bb.all(promises).then(results => {
                            console.log(results);
                        })
                    });

                } catch (e) {
                    resolve(false);
                    console.log(e);
                }

            })
        },
        getStructure: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    let struc = [];
                    let user = info.username;
                    GenericFile.find({uploader: user}).then(res =>{
                        console.log(res);
                        resolve(res);
                    });
                } catch (e) {
                    throw (e)
                    resolve(null);
                    return;
                }
            })

        }
    },
    Mutation: {
        renameFile: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    GenericFile.update({
                        userRelativePath: args.path,
                        _id: args._id,
                        uploader: info.username
                    }, {
                            name: args.newName
                        }).then(res => {
                            resolve(true);

                        }).catch((e) => {
                            throw (e);
                            resolve(false);
                            return;
                        });
                } catch (e) {
                    throw (e);
                    resolve(false);
                    return;
                }
            })
        },
        addFolder: async function (parent, args, {
            GenericFile
        }) {
            // path is in terms from user root directory
            return await new Promise((resolve, reject) => {
                console.log(args);
                try {
                    var info = jwt.verify(args.token, secret);
                    var path = [];

                    var folder = new GenericFile({
                        absolutePath: null,
                        userRelativePath: args.path,
                        name: args.name,
                        uploader: info.username,
                        type: "dir"
                    })
                    console.log(folder);
                    GenericFile.find({
                        userRelativePath: args.path,
                        name: args.name,
                        uploader: info.username
                    }).then((res) => {
                        //TODO: Add a way to make sure none of the folder have the same name
                        if (res != null) {
                            if (folder.name == '') {
                                folder.name = 'New Folder'
                            }
                        }
                        folder.save().then((e) => {
                            resolve(true)
                        }).catch((e) => resolve(false));
                    })

                } catch (e) {
                    throw (e);
                    resolve(false);
                    return;
                }
            });
        },
        remove: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    if (args.path == 'undefined') args.path = '';
                    GenericFile.find({
                        userRelativePath: args.path === '' ? '/' : args.path,
                        name: args.name
                    }).then((res) => {
                        res.forEach(element => {
                            if (element.type == 'dir') {
                                removeSubitems(element.uploader, element.userRelativePath, element.name).then(() => {
                                    element.remove();
                                    resolve(true);
                                });
                            } else {
                                try {
                                    fs.unlinkSync(_path.resolve(__dirname + `../../../../../../users/${element.uploader}/${element.path === undefined ? '/' : element.path}/${element.name}`));
                                    element.remove().then(() => resolve(true));
                                } catch (e) {
                                    if (e.code == 'ENOENT') {
                                        element.remove().then(() => resolve(true));
                                    } else resolve(false);
                                }
                            }
                        });
                    })
                } catch (e) {
                    throw (e);
                    resolve(false);
                }
            })
        },
        generateLink: async function (parent, args, {
            GenericFile
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    GenericFile.findOne({
                        uploader: info.username,
                        userRelativePath: args.path == '' ? '/' : args.path,
                        name: args.name
                    }).then((file) => {
                        var url = uuid.v4(3);
                        file.sharing_links.push(url);
                        file.save().then((res) => resolve(url));
                    })
                } catch (e) {
                    resolve(false);
                }
            });
        }
    }
}

module.exports = resolvers;