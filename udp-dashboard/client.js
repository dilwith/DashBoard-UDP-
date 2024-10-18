// client.js

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const sendMessage = (message) => {
  client.send(message, 41234, 'localhost', (err) => {
    if (err) {
      console.error('Error sending message:', err);
      client.close();
    } else {
      console.log(`Message sent: ${message}`);
    }
  });
};

// Envia pacotes UDP a cada 2 segundos
setInterval(() => {
  const randomValue = Math.floor(Math.random() * 100).toString();
  sendMessage(randomValue);
}, 2000);
