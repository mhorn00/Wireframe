
var { fileLoader, mergeTypes } = require('merge-graphql-schemas');
var path = require('path');
const typeDefArray = fileLoader(path.join(__dirname, '/typeDefs/'));

module.exports = mergeTypes(typeDefArray);