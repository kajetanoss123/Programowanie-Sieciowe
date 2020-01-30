const express = require('express');
const router = express.Router();
const measurement = require('../models/measurement');
module.exports = router;

router.get('/', async (req, res) => {
    try{
        const measurements = await measurement.find();
        res.json(measurements);
    } catch (e) {
        res.status(500).json({ message: e.message});
    }

});
router.get('/last', async (req, res) => {
    try{
        const measurements = await measurement.findOne().sort({'date': -1});
        res.json(measurements);

    } catch (e) {
        res.status(500).json({ message: e.message});
    }
});

