const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    homeId: {
        type: Schema.Types.ObjectId,
        ref: 'Home',
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Favourite', favouriteSchema);