require("dotenv").config()
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const MONGODB_URI = `mongodb+srv://${process.env.USER}:${process.env.PWD}@cluster0.lpnm2.mongodb.net/Receipes_lab?retryWrites=true&w=majority`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    Recipe.deleteMany()
    .then(()=>{
      Recipe.insertMany(data)
      .then((response) => {
        console.log(response.map(el=>el.title))
        Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
        .then(()=>{
          console.log('name changed')
          Recipe.deleteOne({title: "Carrot Cake"})
          .then(()=>{
            console.log("carrot cake deleted")
            mongoose.connection.close();
          })
          .catch(error => console.log(error))
        })  
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  })
  .catch(error => console.log(error))
})
  .catch(error => {
    console.error('Error connecting to the database', error)
  });

  /*.then(() => {
    Recipe.create({
      title: "Asian stuff",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
  })
  .then((data)=>{
    console.log(data.title)
  })
  })
*/

