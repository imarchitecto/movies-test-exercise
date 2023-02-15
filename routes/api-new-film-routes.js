const express = require('express');
const { addFilm, } = require('../controllers/api-new-film-controller')

const router = express.Router();


router.post('api/new-film', addFilm);
  
/* router.get('/new-film', getFilm);  */

module.exports = router;