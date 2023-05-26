//npm install nodemon -> auto refresh on saves
const express = require('express'); //npm install express -> used to create endpoints and listen 
const mongoose = require('mongoose'); //npm install mongoose -> used to connect and work with db
const Cat = require('./models/Cat'); //imports Cat model
const app = express();

if(process.env.NODE_ENV !== 'production') { //Configures .env file if NODE_ENV = production was not set before start
    require('dotenv').config(); //npm install dotenv
}

const PORT = process.env.PORT || 3000; //checks for environment variable, if none then 3000
const CONNECTION = process.env.CONNECTION;

app.use(express.json()); //allows express to parse request with Content-Type: application/json
app.use(express.urlencoded({extended: true})); //allows express to use url for parameters/queries

const start = async() => { //function declared for start
    try{
        await mongoose.connect(CONNECTION); //Connects to DB using connection string from .env file

        app.listen(PORT, () => { //sets program to listen on port # declared in .env file (or 3000 if NODE_ENV === production)
            console.log('Listening on port:' + PORT);
        })
    } catch(e) {
        console.log(e.message);
    }
}

app.get('/api/cat/:name', async (req, res) => {
    try{
        const catName = req.params.name; //grab name from request parameter
        const foundCat = await Cat.findOne({name: catName}); //search for one cat with the name
        if(foundCat) res.json(foundCat); //returns cat if found
        else throw new Error(`No cats found by the name of ${catName}`) //throws error if not found
    } catch(e) {
        res.status(404).send(e.message); //returns error message if failed
    }
});

app.get('/api/cats', async (req, res) => {
    try {
        const allCats = await Cat.find(); //queries for all cats
        if(allCats) res.status(200).json(allCats); //returns all cats with a 200 status if allCats isn't null
        else throw new Error('Couldn\'t find any cats...'); //throws error if allCats === null
    } catch(e) {
        res.status(404).send(e.message); //returns 404 with error message to user if failed
    }
})

app.post('/api/cat', async (req, res) => {
    console.log(req);
    try{
        const cat = new Cat(req.body); //converts body to Cat model
        await cat.save(); //saves cat to the DB
        res.status(201).json({cat}); //Sends status for succesful post, and the model back
    } catch(e) {
        res.status(500).json(e.message); //Returns 500 with error message if model creation or save failed
    }
});

start(); //starts web server
