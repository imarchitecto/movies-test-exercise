const express = require('express');
const router = express.Router();
const { getFoundFilm } = require('../controllers/api-list-films-controller');


router.get('api/list-films', getFoundFilm); 

module.exports = router;

