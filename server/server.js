const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
const auth = require('./routes/authRoutes');
const providers = require('./routes/providerRoutes');
const bookings = require('./routes/bookingRoutes');
const services = require('./routes/serviceRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/providers', providers);
app.use('/api/bookings', bookings);
app.use('/api/services', services);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
