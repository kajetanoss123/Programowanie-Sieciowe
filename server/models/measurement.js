let mongoose = require('mongoose');

let Measure = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        temperature: {
            type: Number,
            required: true
        },
        humidity: {
            type: Number,
            required: true
        },
        pressure: {
            type: Number,
            required: true
        }
    },
    {
        collection: 'measurement'
    });

module.exports = mongoose.model('Measure', Measure);
