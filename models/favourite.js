const { getDb } = require('../utils/databaseUtil');

module.exports = class Favourite {

    static addToFavourite(name) {
        return getDb().collection('favourites').updateOne(
            { name },
            { $setOnInsert: { name } },
            { upsert: true }
        );
    }

    static async getFavourite() {
        const favourites = await getDb()
            .collection('favourites')
            .find({}, { projection: { name: 1, _id: 0 } })
            .toArray();
        return favourites.map(favourite => favourite.name);
    }

    static removeFromFavourite(name) {
        return getDb().collection('favourites').deleteOne({ name });
    }
};