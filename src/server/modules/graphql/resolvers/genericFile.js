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

async function checkFolderName(name, username, path) {
    GenericFile.find({
        owner: username,
        type: "|dir|",
        path: path,
    })
}

async function removeSubItems(parentId) {
    Folder.findOne({ _id: parentId }).then(folder => {
        folder.children.forEach(child => {
            if (child.type === '|dir|') removeSubItems(child._id);
            else {
                GenericFile.findOne({ _id: child._id }).then(item => {
                    try {
                        fs.unlinkSync(_path.resolve(__dirname + `../../../../../../users/${item.owner}/${item.name}`));
                        item.remove().then(() => resolve(true));
                    } catch (e) {
                        if (e.code == 'ENOENT') {
                            item.remove().then(() => resolve(true));
                        } else resolve(false);
                    }
                })
            }
        })
    })
}

var resolvers = {
    Query: {
        files: async function (parent, args, {
            GenericFile, Folder
        }) {
            return await new Promise((resolve, reject) => {
                var info;
                try {
                    info = jwt.verify(args.token, secret);
                    var childrenPromises = [];
                    var children = [];
                    childrenPromises.push(Folder.find({ parentId: args.parentId }));
                    childrenPromises.push(GenericFile.find({ parentId: args.parentId }));
                    bb.all(childrenPromises).then(res => {
                        resolve(res[0].concat(res[1]));
                    })
                } catch (e) {
                    console.log(e)
                    resolve(false);
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
                                var prom = GenericFile.find({
                                    owner: info.username,
                                    userRelativePath: ['']
                                });
                                promises.push(prom);
                            }

                        })
                        bb.all(promises).then(results => {

                        })
                    });

                } catch (e) {
                    resolve(false);
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
                    GenericFile.find({ owner: user }).then(res => {
                        resolve(res);
                    });
                } catch (e) {
                    throw (e)
                    resolve(null);
                    return;
                }
            })

        },
        resolvePath: async function (parent, args, {
            Folder
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    let resDir = [];
                    args.path.forEach(id=>{
                        Folder.findOne({_id: id}).then(res=>{
                            resDir.push(res.name);
                        });
                        console.log("RES DIR",resDir)
                    });
                    resolve(resDir);
                } catch (e) {
                    throw (e);
                    resolve(null);
                    return;
                }
            })
        },
    },
    Mutation: {
        renameFile: async function (parent, args, {
            GenericFile, Folder
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    if (args.type != '|dir|') {
                        GenericFile.update({ _id: args._id, owner: info.username }, { name: args.newName }).then(res => {
                            resolve(true);
                        }).catch((e) => {
                            throw (e);
                            resolve(false);
                            return;
                        });
                    } else {
                        Folder.update({ _id: args._id }, { name: args.newName }).then(res => {
                            resolve(true);
                        }).catch((e) => {
                            throw (e);
                            resolve(false);
                            return;
                        });
                    }
                } catch (e) {
                    throw (e);
                    resolve(false);
                    return;
                }
            })
        },
        addFolder: async function (parent, args, {
            GenericFile, Folder
        }) {
            // path is in terms from user root directory
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    var folder = new Folder({
                        name: args.name,
                        parentId: args.parentId,
                        owner: info.username
                    })
                    folder.save().then(() => {
                        Folder.findOne({ _id: args.parentId }).then(res => {
                            res.children.push({ childType: "|dir|", childId: folder._id, childName: args.name });
                            res.save().then(() => {
                                resolve(true);
                            })
                        })
                    })
                } catch (e) {
                    throw (e);
                    resolve(false);
                    return;
                }
            });
        },
        remove: async function (parent, args, {
            GenericFile, Folder
        }) {
            return await new Promise((resolve, reject) => {
                try {
                    var info = jwt.verify(args.token, secret);
                    if (args.type === '|dir|') {
                        Folder.findOne({
                            _id: args._id
                        }).then((element) => {
                            Folder.remove({ _id: element._id }).then(() => resolve(true));

                        });
                    }
                    else {
                        GenericFile.findOne({ _id: args._id }).then(item => {
                            try {
                                fs.unlinkSync(item.absolutePath);
                                item.remove().then(() => resolve(true));
                            } catch (e) {
                                if (e.code == 'ENOENT') {
                                    item.remove().then(() => resolve(true));
                                } else resolve(false);
                            }
                        })
                    }
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
                        owner: info.username,
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