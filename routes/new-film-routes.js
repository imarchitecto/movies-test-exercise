const express = require('express');
const { addFilm, getFilm } = require('../controllers/new-film-controller')

const router = express.Router();


router.post('/new-film', addFilm);
  
router.get('/new-film', getFilm); 

module.exports = router;