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
        port: 3000,
        serverHost: '192.168.1.49', //Replace this with main pouch db server ip
        serverPort: 3231,
        serverDbName: 'live'
    }
};