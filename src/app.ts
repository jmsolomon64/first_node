//npm install nodemon -> auto refresh on saves
//---Required packages for app.js---
import dotenv from 'dotenv';
import express, {Express, Request, Response } from 'express'; //npm install express -> used to create endpoints and listen 
import mongoose from 'mongoose';//npm install mongoose -> used to connect and work with db
import cors from 'cors'; //npm install cors -> used to enable cors middleware 
import { Cat } from './models/Cat';  //imports Cat model
const app: Express = express();

//---Checks dev environment---
if(process.env.NODE_ENV !== 'production') { //Configures .env file if NODE_ENV = production was not set before start
    
}
dotenv.config(); //used for .env file
//---Determined by .env file---
const PORT  = process.env.PORT || 3000; //checks for environment variable, if none then 3000
const CONNECTION: string = process.env.CONNECTION || '';

//---Middleware for API---
app.use(express.json()); //allows express to parse request with Content-Type: application/json
app.use(express.urlencoded({extended: true})); //allows express to use url for parameters/queries
app.use(cors()); //allows for communication with clients

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

//Get cat by name
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

//Get all cats
app.get('/api/cats', async (req, res) => {
    try {
        const allCats = await Cat.find(); //queries for all cats
        if(allCats) res.status(200).json(allCats); //returns all cats with a 200 status if allCats isn't null
        else throw new Error('Couldn\'t find any cats...'); //throws error if allCats === null
    } catch(e) {
        res.status(404).send(e.message); //returns 404 with error message to user if failed
    }
})

//Create a cat
app.post('/api/cat', async (req, res) => {
    try{
        const cat = new Cat(req.body); //converts body to Cat model
        await cat.save(); //saves cat to the DB
        res.status(201).json({cat}); //Sends status for succesful post, and the model back
    } catch(e) {
        res.status(500).json(e.message); //Returns 500 with error message if model creation or save failed
    }
});

//Create new hobby   
app.patch('/api/cat/hobby/new/:id', async (req, res) => {
    try {
        const catId = req.params.id;
        const result = await Cat.findByIdAndUpdate(catId, {$push: {'hobbies': req.body}}, {new: true});
        if (result) res.status(201).json(result);
        else throw new Error('Couldn\'t add hobby.');
    } catch(e) {
        res.status(500).send(e.message);
    }
});

//Update cat by Id
app.patch('/api/cat/update/:id', async (req, res) => {
    const catId = req.params.id;
    try {
        const result = await Cat.findByIdAndUpdate(catId, req.body, {new: true}); //replaces model with id using req.body
        if(result) res.status(200).json(result); //sends new data back if succesful
        else throw new Error('Couldn\'t update cat right now.'); //throw error if modified rows less than 0
    } catch(e) {
        res.status(500).send(e.message);
    } 
})

//Delete cat by Id
app.delete('/api/cat/:id', async (req, res) => {
    const catId = req.params.id;
    console.log(catId);
    try {
        const result = await Cat.deleteOne({_id: catId}); //attempts to delete cat by id
        if(result.deletedCount > 0) res.status(200).send('Cat deleted'); //sends 200 if succesful
        else throw new Error('Cat couldn\'t be deleted right now.'); //throws error if no deletes were made
    } catch(e) {
        res.status(500).send(e.message); //return error messsage and 500
    }
})

start(); //starts web server
