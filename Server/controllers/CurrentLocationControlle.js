

const currentLocationController = (req, res) => {
    const { latitude, longitude } = req.body;
  
    console.log('Received location data:', { latitude, longitude });
  
    res.json({ message: 'Location data received and processed successfully.' });
  };
  
  module.exports = {
    currentLocationController,
  };
  