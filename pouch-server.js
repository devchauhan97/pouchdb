const nrc = require('node-run-cmd');
const config = require('./config');

nrc.run(`pouchdb-server -o ${config.EnvConfig.serverHost} -p ${config.EnvConfig.serverPort} -m`).then(function (command) {
    console.log(command);
});