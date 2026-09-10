const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    houseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    imageURL: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model('Home', homeSchema);