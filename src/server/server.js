var { request } = require('https');

var childProcess = require('child_process');
var mongoose = require('mongoose');
var email = require('../server/modules/email');

/*
    SETTING UP MONGO CHILD PROCESS
*/

var mongoProcess = childProcess.spawn('mongod');

global.mongo = mongoose.createConnection('mongodb://localhost:27017');

var express = require('express');

var PORT = 3000;

var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.static('./dist/'))

var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var bodyParser = require('body-parser');

var { User, GenericFile, Session, Folder } = require('./modules/mongo/schemas')
var { typeDefs, resolvers } = require('./modules/graphql/')

const schema = makeExecutableSchema({
    typeDefs, resolvers
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema, context: { User, GenericFile, Folder, Session }
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

var path = require('path');
var multer = require('multer');
var upload = multer()
var jwt = require('jsonwebtoken');
var secret = require('./secret');
var fs = require('fs');

app.post('/upload', upload.single('file'), function (req, res) {
    if (req.body.fromSite == 'true') {
        var token = req.body.token;
        try {
            var info;
            if (info = jwt.verify(token, secret)) {
                var file = req.file;
                var absPath = path.resolve('./users/' + info.username + '/' + file.originalname + req.body.path);
                var writeFile = fs.writeFile(absPath, file.buffer, (err, result) => {
                    if (err) throw err;
                    var mongoFile = new GenericFile({
                        absolutePath: absPath,
                        fileSize: file.size,
                        parentId: req.body.path,
                        name: file.originalname,
                        owner: info.username,
                        type: file.mimetype
                    });
                    mongoFile.save().then((e) => {res.send('Recived and saved')});
                    Folder.findOne({_id:req.body.path}).then((folder)=>{
                        folder.children.push(mongoFile);
                        folder.save();
                    })
                });
            }
        }
        catch (e) {
            if (e) {
                throw e;
            }
            res.send('Denied');
        }
    }
    else {
        var key = req.body.key;
    }
})

app.get('/filedl', function (req, res) {
    try {
        var info = jwt.verify(req.query.token, secret);
        var _path = path.resolve(__dirname + `../../../users/${info.username}/${req.query.rawName}`);
        res.download(_path, function (err) {
            if (err) {
            }
        });
    }
    catch (e) {
        res.send('Sorry, invalid something.')
    }
})

app.get('/registerUser/:hash', function (req, res) {
    User.findOne({ registrationHash: req.params.hash }).then((u) => {
        u.approved = true;
        fs.mkdirSync(path.resolve(__dirname + "/../../users/" + u.username));
        u.save().then(() => res.send(`approved ${u.username}`));
    })
})

app.get('/f/:hash', function (req, res) {

    GenericFile.findOne({ sharing_links: { $in: [req.params.hash] } }).then((result) => {
        if (result.type == 'dir') {
            res.send("<p> sorry, can't share folders yet </p>")
        }
        var _path = path.resolve(__dirname + `../../../users/${result.owner}/${result.name}`);
        res.sendFile(_path);
    })
})

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(PORT, function () {
})

