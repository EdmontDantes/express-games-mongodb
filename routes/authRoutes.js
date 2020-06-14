const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const snarky = require('../middlewares/snarky');
const { allgames, singlegame, creategame, updategame, deletegame, enter, noentry } = controller;

router.post('/enter', enter, snarky);


module.exports = router;