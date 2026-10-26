const { MongoClient } = require('mongodb');

let db;
let dbPromise;

const mongoConnect = () => {
    if (!process.env.MONGODB_URI) {
        return Promise.reject(new Error('MONGODB_URI environment variable is required'));
    }

    if (!dbPromise) {
        dbPromise = MongoClient.connect(process.env.MONGODB_URI)
            .then(client => {
                db = client.db('airbnb');
                return db;
            })
            .catch(error => {
                dbPromise = null;
                throw error;
            });
    }

    return dbPromise;
};

const getDb = () => {
    if (!db) {
        throw new Error('No database connection. Call mongoConnect first.');
    }
    return db;
};

module.exports = { mongoConnect, getDb };
