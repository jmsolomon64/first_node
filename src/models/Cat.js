const mongoose = require('mongoose'); //needed for mongo DB functionality 

const catSchema = new mongoose.Schema({ //decleration of new schema 
    name: {
        type: String, //data type for field
        required: true //forces name to be required
    },
    furPattern: {
        type: String,
        required: true
    },
    favoriteColor: String //if not required, just need data type
});

module.exports = mongoose.model('Cat', catSchema); //exports this model with mongo DB functionality to the rest of project