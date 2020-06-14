const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

const { allgames, singlegame, creategame, updategame, deletegame, enter, noentry } = controller;
// change all route names not to use capital letters
// /allgames

// /singelgame
// /creategame
// /updategame
// /deletegame

router.get('/allgames', allgames);
router.get('/singlegame/:id', singlegame);
router.post('/creategame', creategame);
router.put('/updategame', updategame);
router.delete('/deletegame/:id/:secret', deletegame);

module.exports = router;