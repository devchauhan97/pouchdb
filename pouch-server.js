const config = require('./config');
const spawn = require('child_process').spawn;
let db = spawn('node', ['./node_modules/pouchdb-server/bin/pouchdb-server', '-o',config.EnvConfig.serverHost,'--p', config.EnvConfig.serverPort, '-m']);