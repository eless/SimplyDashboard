/**
 * Created by Eless on 19.07.2015.
 */
var nconf = require('nconf');
var path = require('path');
nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json')});
module.exports = nconf;
