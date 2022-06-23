const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((res) => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(
      {title: 'Tortilla',
      level: 'Easy Peasy',
      ingredients: ['Egg', 'salt'],
      cuisine: 'French',
      dishtype: 'breakfast',
      duration: 5,
      creator: 'Jo mateix'}
    )

  })
  .then((res) => {
    console.log(res.title);
    return Recipe.insertMany(data);
  })
  .then((res) => {
    console.log(res.title);
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })
  .then( (res) => {
    console.log(res);
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
