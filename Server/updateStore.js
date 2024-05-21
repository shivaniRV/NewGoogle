require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Store = require('./storemodal');  


//faker.private.locale()= "en_IN";

const minLat = 6;
const maxLat = 35;
const minLng = 68;
const maxLng = 97;

const mongoUri = process.env.MONGO_URL;
if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is not defined');
}

function generateRandomLatitude() {
    return faker.datatype.float({ min: minLat, max: maxLat });
}

// Function to generate random longitude within the specified range
function generateRandomLongitude() {
    return faker.datatype.float({ min: minLng, max: maxLng });
}

// Connect to MongoDB without deprecated options
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const updateStores = async () => {
    await Store.deleteMany({}); 

    const stores = [];
    for (let i = 0; i < 5000; i++) {
        stores.push({
            name: faker.company.name(),
            latitude: generateRandomLatitude(),
            longitude: generateRandomLongitude(),
            address: faker.address.streetAddress(),
            address: faker.location.streetAddress(),
            email: faker.internet.email(),
            mobile: faker.phone.number()
        });
    }
    await Store.insertMany(stores);
    console.log('Data updated successfully!');
    mongoose.disconnect();
};

updateStores().catch(err => console.error(err));