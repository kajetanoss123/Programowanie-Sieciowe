const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

const msg = {
    command: 'save',
    data: {
        date: Date.now(),
        temperature: 31,
        humidity: 88,
        pressure: 1432
    }
};

ws.on('open', function open() {
    ws.send(JSON.stringify(msg));
});

ws.on('message', function incoming(data) {
    console.log(data);
});
