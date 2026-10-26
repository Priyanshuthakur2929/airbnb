const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    homeId: {
        type: Schema.Types.ObjectId,
        ref: 'Home',
        required: true
    }
});

favouriteSchema.index({ userId: 1, homeId: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteSchema);