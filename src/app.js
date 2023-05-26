//npm install nodemon -> auto refresh on saves
const express = require('express'); //npm install express -> used to create endpoints and listen 
const mongoose = require('mongoose'); //npm install mongoose -> used to connect and work with db
const app = express();

if(process.env.NODE_ENV !== 'production') { //Configures .env file if NODE_ENV = production was not set before start
    require('dotenv').config(); //npm install dotenv
}

const PORT = process.env.PORT || 3000; //checks for environment variable, if none then 3000
const CONNECTION = process.env.CONNECTION;

const start = async() => {
    await mongoose.connect(CONNECTION);

    app.listen(PORT, () => {
        console.log('Listening on port:' + PORT);
    })
}

const cats = [
    {
        name: "Juno",
        furPattern: "Orange, Brown, and black splotches",
        favoriteColor: "Purple"
    },
    {
        name: "Luna",
        furPattern: "Light brown and grey splotches on top of white base",
        favoriteColor: "Purple"
    },
    {
        name: "Gerald",
        furPattern: "Varying shades of light grey with darker grey stripes",
        favoriteColor: "Green"
    },
    {
        name: "Inky",
        furPattern: "Varying shades of dark grey with very slightly darker leopard spots",
        favoriteColor: "Light blue"
    },
    {
        name: "Riley",
        furPattern: "Varying shades of light grey, brown, orange, and a white underbelly",
        favoriteColor: "Orange"
    }
]

app.get('/', (req, res) => {
    res.send({"data": cats});
});

app.post('/', (req, res) => {
    res.send({"data": cats[req.id]});
});

try {
    start();
} catch(e) {
    console.log(e.message);
}
