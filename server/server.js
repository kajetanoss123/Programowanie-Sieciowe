require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const measurementRouter = require('./routes/measurement');
const Measure = require('./models/measurement');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(cors());
cors({credentials: true, origin: true});

app.use('/measurement', measurementRouter);
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
    console.log("client connected");
    ws.on('message', function incoming(message) {
        console.log("recived message: "+message);
        try{
            wss.clients.forEach(wsClient =>{
               wsClient.send(message)
            });
            const obj = JSON.parse(message);

            if(obj.command === 'save'){
                let newMeasurement = new Measure({
                    date: new Date(),
                    temperature: obj.temperature,
                    humidity: obj.humidity,
                    pressure: obj.pressure
                });
                newMeasurement.save();
            }

        }catch (e) {
            console.log(message);
            console.log(e.message);
        }

    });
});
app.listen(3000, () => {
    console.log('Server has started');


});
