const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const config = require('./config');
const PouchDB = require('pouchdb');
const db = new PouchDB('hesta_db');

app.engine('ejs', require('express-ejs-extend'));
app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.set('env', 'dev');

app.get('/', function(req, res, next) {

    res.render("index", {host: config.EnvConfig.host,port: config.EnvConfig.port});

});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/create', urlencodedParser, function (req, res) {

    db.post({
        title: req.body.title,
        group: req.body.group
    }).then(function (response) {
        res.send(response);
    }).catch(function (err) {
        console.log(err);
    });

})

app.post('/view', function (req, res) {

    db.allDocs({
        include_docs: true,
        attachments: true,
        descending:true
    }).then(function (result) {
        res.send(result.rows);
    }).catch(function (err) {
        console.log(err);
    });

})

app.post('/delete-row', urlencodedParser, function (req, res) {

    db.get(req.body.id).then(function (doc) {
        return db.remove(doc);
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        console.log(err);
    });

})

const socket_server = app.listen(config.EnvConfig.port, config.EnvConfig.host, function () {
    console.log(`Click here to go app :http://${config.EnvConfig.host}:${config.EnvConfig.port}`);
});

const io = require('socket.io').listen(socket_server);

PouchDB.sync('hesta_db', `http://${config.EnvConfig.serverHost}:${config.EnvConfig.serverPort}/${config.EnvConfig.serverDbName}`, {
    live: true,
    retry: true
}).on('change', function (info) {
     io.emit('change', {data: info});
});
module.exports = app;