const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');   // ✅ yaha add karo

const app = express();
const PORT = 3000;

app.use(cors());                // ✅ yaha add karo (routes se pehle)
app.use(express.json());

app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');   
const cartRoutes = require('./routes/cart');

// Use routes
app.use('/api/auth', authRoutes);  
app.use('/api/cart', cartRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});