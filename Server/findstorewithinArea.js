require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('./storemodal');

async function findStoresWithinArea(polygon) {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        const stores = await Store.find({
            location: {
                $geoWithin: {
                    $geometry: {
                        type: "Polygon",
                        coordinates: polygon
                    }
                }
            }
        });

        console.log(stores);
    } catch (error) {
        console.error('Error finding stores within area:', error);
    } finally {
        mongoose.disconnect();
    }
}

const examplePolygon = [
    [
        [73.0, 18.0],
        [74.0, 18.0],
        [74.0, 19.0],
        [73.0, 19.0],
        [73.0, 18.0]
    ]
];

findStoresWithinArea(examplePolygon);
