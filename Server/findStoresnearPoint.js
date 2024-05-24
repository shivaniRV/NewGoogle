require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('./storemodal');

async function findStoresNearPoint(point, maxDistance) {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: point,
                    $maxDistance: maxDistance
                }
            }
        });

        console.log(stores);
    } catch (error) {
        console.error('Error finding stores near point:', error);
    } finally {
        mongoose.disconnect();
    }
}

const examplePoint = {
    type: "Point",
    coordinates: [73.0, 18.0]
};
const maxDistance = 10000;

findStoresNearPoint(examplePoint, maxDistance);
