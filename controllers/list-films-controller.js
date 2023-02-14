const Film = require('../models/film-mod');
const createPath = require('../helpers/create-path');

const getFoundFilm = (req, res) => {
  const title = 'Поиск фильма';
  Film
    .find({title: `${req.query.text}`}, {title: 1})
    .then(films => res.render(createPath('list-films'), {  films, title })) 
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
}

module.exports = {
    getFoundFilm,
}