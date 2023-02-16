const Film = require('../models/film-mod');
const { newFilmValidation } = require('../validations/new-film-validation');

const addFilm = (req, res) => {
    const { error } = newFilmValidation(req.body);
    if(error) return next(error)
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
      .then((post) => res.status(200).json(post))
      .catch((error) => {
        res.status(500).send(error);
    });
};

module.exports = {
    addFilm,
}