var Deploy = require('ftp-deploy');
var ftpDeploy = new Deploy();

var host = process.argv[2]
var user = process.argv[3]
var password = process.argv[4]

var config = {
    host,
    user,
    password,
    port: 21,
    localRoot: __dirname + '/build',
    remoteRoot: '/front-end/',
    include: ['*'],
    deleteRemote: true 
}
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err)
    else console.log('finished:', res);
});
ftpDeploy.on("uploading", function(data) {
    data.totalFilesCount; 
    data.transferredFileCount;
    data.filename; 
});
ftpDeploy.on("uploaded", function(data) {
    console.log(data); 
});
ftpDeploy.on("log", function(data) {
    console.log(data);
});
ftpDeploy.on("upload-error", function(data) {
    console.log(data.err);
});