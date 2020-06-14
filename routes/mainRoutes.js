const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

const { allgames, singlegame, creategame, updategame, deletegame, enter, noentry } = controller;

router.post('/noentry', noentry);


module.exports = router;