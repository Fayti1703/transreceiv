const NET = require('net');
const NoIPError = 'An IP address for broadcasting is required.';

let HOST;
if (process.argv[2] != null) {
    HOST = process.argv[2];
}
else {
    throw NoIPError;
}

const PORT = 2876;

NET.createServer(function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.on('data', function(data) {
        console.log('DATA: ' + sock.remoteAddress + ': ' + data);
        sock.write('Data received. Content: "' + data + '"');
    });
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort);
    });
}).listen(PORT, HOST);

console.log(' Server listening on ' + HOST + ':' + PORT);
