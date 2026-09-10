const mongoose = require('mongoose');

const url = 'mongodb+srv://thakur2924_db_user:Priyanshu2929@backend.gbb0xn1.mongodb.net/airbnb?appName=Backend';

const mongoConnect = () => {
    return mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB via Mongoose');
        })
        .catch(err => {
            console.log('Error while connecting to MongoDB', err);
            throw err;
        });
};

module.exports = { mongoConnect };