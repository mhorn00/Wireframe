var password = require('password-hash');
var Promise = require('bluebird');
var secret = require('../../secret')

var exports = {
    generate: function (pass, length) {
        return password.generate(pass, {
            algorithm: "sha256",
            saltLength: 32,
            iterations: 5
        });
    },
    verify: function (givenPass, hash) {
        try{
            var ret = password.verify(givenPass,hash)
        }catch(e){
            ret = null;
        }
        return ret;
    }
}

module.exports = exports;