

import axios from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json', 
  },
});


export const sendLocation = (latitude, longitude) => api.post('/api/current-location', { latitude, longitude });

export const enterLocation = (location) => api.get(`/api/enter-location?location=${location}`);

export const filterStates = (states) => api.post('/api/filter-states', { states });

export const filterStoresByCategory = (stores) => api.post('/api/filter_category', { stores });

export const login = (username, password) => api.post('/api/login', { username, password });


export default api;
