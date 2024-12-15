require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Store = require('./storemodal');  


//faker.private.locale()= "en_IN";

<<<<<<< HEAD
const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];


=======
>>>>>>> 2564fb1a6c8811227e1121b81c5c755e1eb5995b
const minLat = 6;
const maxLat = 35;
const minLng = 68;
const maxLng = 97;

const mongoUri = process.env.MONGO_URL;
if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is not defined');
}

function generateRandomLatitude() {
<<<<<<< HEAD
    return faker.number.float({ min: minLat, max: maxLat });
=======
    return faker.datatype.float({ min: minLat, max: maxLat });
>>>>>>> 2564fb1a6c8811227e1121b81c5c755e1eb5995b
}

// Function to generate random longitude within the specified range
function generateRandomLongitude() {
<<<<<<< HEAD
    return faker.number.float({ min: minLng, max: maxLng });
}


const state = [
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

function generateRandomIndianState() {
    const randomIndex = faker.datatype.number({ min: 0, max: state.length - 1 });
    return state[randomIndex];
}
function generateRandomCategory() {
    const randomIndex = faker.datatype.number({ min: 0, max: category.length - 1 });
    return category[randomIndex];
=======
    return faker.datatype.float({ min: minLng, max: maxLng });
>>>>>>> 2564fb1a6c8811227e1121b81c5c755e1eb5995b
}

// Connect to MongoDB without deprecated options
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const updateStores = async () => {
    await Store.deleteMany({}); 

    const stores = [];
    for (let i = 0; i < 5000; i++) {
<<<<<<< HEAD
        const latitude = generateRandomLatitude();
        const longitude = generateRandomLongitude();

        // GeoJSON Point object
        const point = {
            type: "Point",
            coordinates: [longitude, latitude]
        };

        stores.push({
            name: faker.company.name(),
            location: point, // Store the GeoJSON Point in the "location" field
            address: faker.location.streetAddress(),
            email: faker.internet.email(),
            mobile: faker.phone.number(),
            state: generateRandomIndianState(),
            category:generateRandomCategory(),
        });
    }

   
=======
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
>>>>>>> 2564fb1a6c8811227e1121b81c5c755e1eb5995b
    await Store.insertMany(stores);
    console.log('Data updated successfully!');
    mongoose.disconnect();
};

updateStores().catch(err => console.error(err));