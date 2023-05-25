const express = require('express');
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log('Listening on port:' + PORT);
})
