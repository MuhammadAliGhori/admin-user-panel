const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connect');
const cors = require('cors');

const app = express();
const PORT =  8000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());


// admin login
const loginRoutes = require('./routes/loginRoutes');
app.use('/api', loginRoutes);

// users login
const userRoutes = require('./routes/userFormRoutes');
app.use('/api', userRoutes);

// booking form
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// MongoDB connection
const start = async () => {
  try {
    await connectDB("mongodb+srv://alighori:TP8k0sgnbDiXPiS2@cluster0.xcotkn8.mongodb.net/alighori?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (error) {
    console.error('Failed to connect to MongoDB', error.message);
  }
};

start();
