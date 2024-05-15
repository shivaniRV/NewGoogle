// controllers/EnterLocationController.js

const enterLocationController = (req, res) => {
    const { location } = req.body;
  
    // Process the received location data (e.g., store it in a database)
    console.log('Received location:', location);
  
    // Send a response back to the frontend
    res.status(200).json({ message: 'Location data received successfully.' });
  };
  
  module.exports = {
    enterLocationController,
  };
  