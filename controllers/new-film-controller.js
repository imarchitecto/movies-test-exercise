const Film = require('../models/film-mod');
const createPath = require('../helpers/create-path');

const addFilm = (req, res) => {
    const { title, directors, geners, countries, year, description, type } = req.body;
    directorsArray = directors.split(', ');
    genersArray = geners.split(', ');
    countriesArray = countries.split(', ');
    const film = new Film({ title, directors, geners, countries, year, description, type });
  
    for(i = 0; i < directorsArray.length; i++) {
      let element = directorsArray[i];
      film.directors.push(element);
    }
    film.directors.shift();
  
    for(i = 0; i < genersArray.length; i++) {
      let element = genersArray[i];
      film.geners.push(element);
    }
    film.geners.shift();
    
    for(i = 0; i < countriesArray.length; i++) {
      let element = countriesArray[i];
      film.countries.push(element);
    }
    film.countries.shift();
  
    console.log(film);
  
    film
      .save()
      .then((result) => res.redirect('/list-films'))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'), { title: 'Error' });
    });
};

const getFilm = (req, res) => {
    const title = 'Добавить фильм';
    res.render(createPath('new-film'), { title });
}

module.exports = {
    addFilm,
    getFilm
}