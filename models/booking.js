const { getDb } = require('../utils/databaseUtil');

module.exports = class Booking {

    static addBooking(homeId) {
        return getDb().collection('bookings').insertOne({ homeId: String(homeId) });
    }

    static async getBookings() {
        const bookings = await getDb()
            .collection('bookings')
            .find({}, { projection: { homeId: 1, _id: 0 } })
            .toArray();
        return bookings.map(booking => booking.homeId);
    }
};
