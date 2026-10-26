const mongoose = require('mongoose');

let connectionPromise;

const mongoConnect = () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        return Promise.reject(new Error('MONGODB_URI environment variable is required'));
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(uri, { dbName: 'airbnb' })
            .then(() => mongoose.connection)
            .catch(error => {
                connectionPromise = null;
                throw error;
            });
    }

    return connectionPromise;
};

module.exports = { mongoConnect };
