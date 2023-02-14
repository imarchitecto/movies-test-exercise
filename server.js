const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Film = require('./models/film-mod');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://totem:qwerty123@cluster0.vo6pg2q.mongodb.net/beeline-test?retryWrites=true&w=majority';

mongoose.set('strictQuery', true)
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Поиск фильма';
  Film
    .find({title: `${req.query.text}`})
    .then(films => res.render(createPath('list-films'), {  films, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get('/list-films', (req, res) => {
  const title = 'Поиск фильма';
  Film
    .find({title: `${req.query.text}`}, {title: 1})
    .then(films => res.render(createPath('list-films'), {  films, title })) 
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
}); 


app.post('/new-film', (req, res) => {
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
});

app.get('/new-film', (req, res) => {
  const title = 'Добавить фильм';
  res.render(createPath('new-film'), { title });
}); 

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
