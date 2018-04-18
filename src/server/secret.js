var fs = require('fs');
var buf = fs.readFileSync('./src/server/_secret');

module.exports = buf.toString();