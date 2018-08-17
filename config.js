var os = require('os');
var ifaces = os.networkInterfaces();
var hostIp = false;

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }
        if (alias >= 1) {
            hostIp = iface.address;
        } else {
            hostIp = iface.address;
        }
        ++alias;
    });
});

module.exports = {
    EnvConfig: {
        host: hostIp,
        port: 7000,
        serverHost: hostIp, //Replace this with main pouch db server ip
        serverPort: 9000,
        serverDbName: 'live'
    }
};