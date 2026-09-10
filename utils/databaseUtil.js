const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

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