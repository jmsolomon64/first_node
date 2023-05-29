"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm install nodemon -> auto refresh on saves
//---Required packages for app.js---
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express")); //npm install express -> used to create endpoints and listen 
const mongoose_1 = __importDefault(require("mongoose")); //npm install mongoose -> used to connect and work with db
const cors_1 = __importDefault(require("cors")); //npm install cors -> used to enable cors middleware 
const Cat_1 = require("./models/Cat"); //imports Cat model
const app = (0, express_1.default)();
//---Checks dev environment---
if (process.env.NODE_ENV !== 'production') { //Configures .env file if NODE_ENV = production was not set before start
}
dotenv_1.default.config(); //used for .env file
//---Determined by .env file---
const PORT = process.env.PORT || 3000; //checks for environment variable, if none then 3000
const CONNECTION = process.env.CONNECTION || '';
//---Middleware for API---
app.use(express_1.default.json()); //allows express to parse request with Content-Type: application/json
app.use(express_1.default.urlencoded({ extended: true })); //allows express to use url for parameters/queries
app.use((0, cors_1.default)()); //allows for communication with clients
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(CONNECTION); //Connects to DB using connection string from .env file
        app.listen(PORT, () => {
            console.log('Listening on port:' + PORT);
        });
    }
    catch (e) {
        console.log(e.message);
    }
});
//Get cat by name
app.get('/api/cat/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catName = req.params.name; //grab name from request parameter
        const foundCat = yield Cat_1.Cat.findOne({ name: catName }); //search for one cat with the name
        if (foundCat)
            res.json(foundCat); //returns cat if found
        else
            throw new Error(`No cats found by the name of ${catName}`); //throws error if not found
    }
    catch (e) {
        res.status(404).send(e.message); //returns error message if failed
    }
}));
//Get all cats
app.get('/api/cats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCats = yield Cat_1.Cat.find(); //queries for all cats
        if (allCats)
            res.status(200).json(allCats); //returns all cats with a 200 status if allCats isn't null
        else
            throw new Error('Couldn\'t find any cats...'); //throws error if allCats === null
    }
    catch (e) {
        res.status(404).send(e.message); //returns 404 with error message to user if failed
    }
}));
//Create a cat
app.post('/api/cat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cat = new Cat_1.Cat(req.body); //converts body to Cat model
        yield cat.save(); //saves cat to the DB
        res.status(201).json({ cat }); //Sends status for succesful post, and the model back
    }
    catch (e) {
        res.status(500).json(e.message); //Returns 500 with error message if model creation or save failed
    }
}));
//Create new hobby
app.patch('/api/cat/hobby/new/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catId = req.params.id;
        const result = yield Cat_1.Cat.findByIdAndUpdate(catId, { $push: { 'hobbies': req.body } }, { new: true });
        if (result)
            res.status(201).json(result);
        else
            throw new Error('Couldn\'t add hobby.');
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//Update cat by Id
app.patch('/api/cat/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catId = req.params.id;
    try {
        const result = yield Cat_1.Cat.findByIdAndUpdate(catId, req.body, { new: true }); //replaces model with id using req.body
        if (result)
            res.status(200).json(result); //sends new data back if succesful
        else
            throw new Error('Couldn\'t update cat right now.'); //throw error if modified rows less than 0
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//Delete cat by Id
app.delete('/api/cat/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catId = req.params.id;
    console.log(catId);
    try {
        const result = yield Cat_1.Cat.deleteOne({ _id: catId }); //attempts to delete cat by id
        if (result.deletedCount > 0)
            res.status(200).send('Cat deleted'); //sends 200 if succesful
        else
            throw new Error('Cat couldn\'t be deleted right now.'); //throws error if no deletes were made
    }
    catch (e) {
        res.status(500).send(e.message); //return error messsage and 500
    }
}));
start(); //starts web server
