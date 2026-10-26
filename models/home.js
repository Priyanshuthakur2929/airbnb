const { getDb } = require('../utils/databaseUtil');  //getDb → brings in the function we wrote earlier to get the connected database.
const { ObjectId } = require('mongodb'); //ObjectId → MongoDB uses special IDs for each document. This helps us find, update, or delete by ID.

module.exports = class Home {
    constructor(houseName, description, imageURL, price, location, rating) {
        this.houseName = houseName;
        this.description = description;
        this.imageURL = imageURL;
        this.price = price;
        this.location = location;
        this.rating = rating;
    }

    save() {
        const db = getDb();
        return db.collection('homes').insertOne(this); //insertOne(this) → inserts the object itself.
    }

    static findById(homeId) {
    const db = getDb();
    return db.collection('homes').findOne({ _id: new ObjectId(homeId) }); //Finds one document in homes collection by its _id.
}

    static updateById(homeId, updatedData) {
        const db = getDb();
        return db.collection('homes').updateOne(
            { _id: new ObjectId(homeId) },
            { $set: updatedData } //$set: updatedData → replaces only the fields you provide.
        );
    }

    static deleteById(homeId) {
        const db = getDb();
        return db.collection('homes').deleteOne({ _id: new ObjectId(homeId) });
    }

    static fetchAll() {  //Gets all documents from the homes collection.
        const db = getDb();
        return db.collection('homes').find().toArray();  //.toArray() → converts the result into a JavaScript array.
    }
};