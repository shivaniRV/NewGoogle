<<<<<<< HEAD
 const mongoose = require('mongoose');

const State = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const category = [
    "Stationary", "Clothing", "Electronics", "Grocery", "Furniture"
];

const storeSchema = new mongoose.Schema({
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: String,
    email: String,
    mobile: String,
    state: {
        type: String,
        enum: State
    },
    category: {
        type: String,
        enum: category
    }
});

// Create a 2dsphere index on the location field for geospatial queries
storeSchema.index({ location: '2dsphere' });

=======
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    address: String,
    email: String,
    mobile: String
});

>>>>>>> 2564fb1a6c8811227e1121b81c5c755e1eb5995b
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
