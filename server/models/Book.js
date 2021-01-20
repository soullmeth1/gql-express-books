const { Schema, model } = require('mongoose');

const BoockSchema = new Schema({
  name: String,
  genre: String,
  authorname: String,
});

module.exports = model('Book', BoockSchema);
