"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const mongoose_1 = require("mongoose"); //needed for mongo DB functionality 
const catSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true //forces name to be required
    },
    furPattern: {
        type: String,
        required: true
    },
    favoriteColor: String,
    hobbies: [
        {
            name: String,
            description: String
        }
    ]
});
exports.Cat = (0, mongoose_1.model)('Cat', catSchema); //exports this model with mongo DB functionality to the rest of project
