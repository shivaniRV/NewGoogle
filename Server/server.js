const express= require('express')
const cors= require('cors')
const morgan =require('morgan')
const dotenv= require('dotenv')
const colors =require('colors')
const connectdb = require('./config/connectdb')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Store = require('./storemodal');
//config dotenv file
dotenv.config();


//databse call
connectdb();

//rest object
const app= express()

//middleware
app.use(morgan(`dev`))
app.use(express.json())
app.use((cors()))



//

//routes
const port = 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const secretKey = 'THISISBESTLEANINGPROJECTFORSHIVANIRAJENDRAVYAS'; 

// Sample data
const stores = [
    { id: 1, name: 'Store A', address: '123 Main St, City, Country', email: 'storea@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Store B', address: '456 Elm St, Town, Country', email: 'storeb@example.com', phone: '987-654-3210' },
  
];

const validCategories = ["Stationary", "Clothing", "Electronics", "Grocery", "Furniture"];

// API to get current location
app.post('/api/current-location', (req, res) => {
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
        res.json({ latitude, longitude });
    } else {
        res.status(400).json({ error: 'Latitude and Longitude are required' });
    }
});

// API to enter location
app.get('/api/enter-location', (req, res) => {
    console.log(req.query);
    const { location } = req.query;
    
    if (location) {
        res.json({ message: `Location entered: ${location}` });
    } else {
        res.status(400).json({ error: 'Location is required' });
    }
});


// API to filter states
app.post('/api/filter-states', (req, res) => {
    const { states } = req.body;
    if (states && Array.isArray(states)) {
        res.json({ states });
        console.log(req.body);
    } else {
        res.status(400).json({ error: 'States array is required' });
    }
    
});

// API to filter stores by category
// app.post('/api/filter_category', (req, res) => {
//     const { stores } = req.body;
//     if (stores && Array.isArray(stores)) {
//         const filteredStores = stores.filter(store => validCategories.includes(store.category));
//         res.json({ filteredStores });
//     } else {
//         res.status(400).json({ error: 'Stores array is required' });
//     }
// });
// app.post('/api/filter_category', async (req, res) => {
//     const { category } = req.body;
//     try {
//         const filteredStores = await Store.find({ category }); // Filter stores by category
//         res.json(filteredStores);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

app.post('/api/filter_category', async (req, res) => {
    const { category, page = 1, limit = 10 } = req.body;
    try {
        const limitNum = parseInt(limit, 10);
        const pageNum = parseInt(page, 10);

        const filteredStores = await Store.find({ category })
            .limit(limitNum)
            .skip((pageNum - 1) * limitNum)
            .sort({ createdAt: -1 });

        const count = await Store.countDocuments({ category });

        res.status(200).json({
            stores: filteredStores,
            totalPages: Math.ceil(count / limitNum),
            currentPage: pageNum,
        });
    } catch (err) {
        res.status(500).send(err);
    }
});



// API to get stores

// const getStores = async (req, res, next) => {
//     try {
       
//         const { page = 1, limit = 10 } = req.query;

//         const pageNumber = Number(page);
//         const limitNumber = Number(limit);

       
//         const skip = (pageNumber - 1) * limitNumber;

     
//         const stores = await Store.find()
//             .limit(limitNumber)
//             .skip(skip)
//             .sort({ createdAt: -1 });

//         const totalStores = await Store.countDocuments();

//         return res.status(200).json({
//             stores,
//             totalPages: Math.ceil(totalStores / limitNumber),
//             currentPage: pageNumber,
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// app.get('/api/stores', getStores);

const getStores = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, state, category, latitude, longitude } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const query = {};

        if (state) {
            query.state = state;

        }
        console.log(state)

        if (category) {
            query.category = category;
        }
        console.log(category)

        if (!isNaN(latitude) && !isNaN(longitude) && latitude>0 && longitude>0) { // Check if latitude and longitude are valid numbers
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);

            query.location = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 10000
                }
            };
        }

        const stores = await Store.find(query)
            .limit(limitNumber)
            .skip(skip)
            .sort({ createdAt: -1 });

        const totalStores = await Store.countDocuments(query);

        return res.status(200).json({
            stores,
            totalPages: Math.ceil(totalStores / limitNumber),
            currentPage: pageNumber,
        });
    } catch (err) {
        next(err);
    }
};

app.get('/api/stores', getStores);


// API to login using JWT
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'shivani123' && password === '!213432') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZhbmkxMjMiLCJpYXQiOjE3MTU4MzE5NjAsImV4cCI6MTcxNTgzNTU2MH0.2mAecMpAiwcJj4N9nxztlmSJ-zA4gHm6DVtoVlc8r0E';

jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.error('Token verification failed:', err);
        return;
    }

    console.log('Decoded token:', decoded);
});


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization',
};

// Use CORS middleware with options
app.use(cors(corsOptions));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


