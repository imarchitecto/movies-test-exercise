const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Film = require('./models/film-mod');
const createPath = require('./helpers/create-path');
const newFilmRoutes = require('./routes/new-film-routes');
const listFilmsRoutes = require('./routes/list-films-routes');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://totem:qwerty123@cluster0.vo6pg2q.mongodb.net/beeline-test?retryWrites=true&w=majority';

mongoose.set('strictQuery', true)
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));


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

app.use(newFilmRoutes);
app.use(listFilmsRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
