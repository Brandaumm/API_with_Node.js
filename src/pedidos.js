const express = require('express');
const router = express.Router();

let rotas = [];

router.get('/', (req, res) => {
    res.json(rotas);
});

router.post('/', (req, res) => {
    const { latitude, longitude } = req.body;
    const novaRota = { latitude, longitude, id: rotas.length + 1 };
    rotas.push(novaRota);
    res.status(201).json(novaRota);
});

module.exports = router;
