// server.js

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const io = require('socket.io')(3001, {
  cors: {
    origin: '*',
  },
});

server.on('message', (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  io.emit('udp-message', msg.toString());
});


server.bind(41234, () => {
  console.log('UDP server listening on port 41234');
});
