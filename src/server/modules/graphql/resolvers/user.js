var mongoose = mongo;
var hasher = require('../../hasher');
var verify = hasher.verify;
var email = require('../../email');
var resolvers = {
    Query: {
        users: async function (parent, args, {User}){
            return await new Promise((resolve,reject)=>{
                User.find({}).then(res=>{
                    resolve(res);
                })
            })
        },
        userExists: async function (parent, args, {
            User
        }) {
            return await new Promise((resolve, reject) => {
                User.findOne({ $or:[{username: args.username}, {email: args.email}]}).then(result => {
                    if(result) resolve(true);
                    else resolve(false);
                }).catch((err)=>{
                    reject(false);
                });
            }) 
        }
    },
    Mutation: {
        register: async function (parent, args, {User}) {
            return await new Promise((resolve, reject) => {
                User.findOne({ email: args.email }).then((user)=>{
                    if(user){
                        resolve(false);
                        return;
                    }
                    var userargs = args;
                    userargs.creationDate = Date.now();
                    userargs.hashedPass = hasher.generate(args.password);
                    var myUser = new User(userargs);
                    myUser.save().then(()=>{
                        resolve(true)
                    }).catch((err)=>{
                        reject(err);
                    })
                    email.register(myUser);
                }).catch((err)=>{
                    reject(err);
                })
            });
        },
        changeInfo: async function (parent,args,{User}){
            return await new Promise((resolve,reject)=>{
                if(!args.email || !args.password){
                    resolve(false);
                    return;
                }
                User.findOne({email:args.email}).then(user=>{
                    var verifyRes = verify(args.pass, user.hashedPass);
                    if(verifyRes == true){
                        if(args.newPass){
                            user.hashedPass =  hasher.generate(args.newPass);
                        }
                        if(args.newEmail){
                            user.email = args.newEmail;
                        }

                    }
                    else{
                        resolve(false);
                        return;
                    }
                    user.save().then(()=>resolve(true));
                })
            })
        },
        /* approve: async function(parent,args,{User}){
            return await new Promise((resolve,reject)=>{
                
            })
        } */
    }
}

module.exports = resolvers;