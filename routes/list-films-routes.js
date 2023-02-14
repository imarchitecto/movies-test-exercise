const express = require('express');
const router = express.Router();
const { getFoundFilm } = require('../controllers/list-films-controller');


router.get('/list-films', getFoundFilm); 

module.exports = router;

