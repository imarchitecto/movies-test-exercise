const Film = require('../models/film-mod');

const getFoundFilm = (req, res) => {
  Film
    .find({title: `${req.query.text}`}, {title: 1})
    .then((post) => res.status(200).json(post)) 
    .catch((error) => {
      res.status(500).send(error)
    });
}

module.exports = {
    getFoundFilm,
}