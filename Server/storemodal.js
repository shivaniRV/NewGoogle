const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    address: String,
    email: String,
    mobile: String
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
