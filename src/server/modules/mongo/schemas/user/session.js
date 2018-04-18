var {Schema} = require('mongoose');
var ttl = require('mongoose-ttl');

let Session = new Schema({
    Username: !String,
    Token: !String
})

Session.plugin(ttl, {ttl: '2d'});

module.exports = mongo.model('Session', Session);