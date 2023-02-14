const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  directors: {
      type: [String],
      required: true
  },
  geners: {
      type: [String],
      required: true
  },
  countries: {
      type: [String],
      required: true
  },
  year: {
      type: Number,
      required: true
  },
  description: {
      type: String,
      required: true
  },  
  type: {
      type: String,
      required: true
  },
});

const Film = mongoose.model('Film', filmSchema);
module.exports = Film;
