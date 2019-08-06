// Reads all files in destination directory
var fs = require('fs');
var files = fs.readdirSync('../client/assets/png-images/');
console.log(files);
