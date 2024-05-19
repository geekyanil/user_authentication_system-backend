const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;
// const URI = process.env.MONGODB_URI_LOCAL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed');
    process.exit(0);
  }
};

module.exports = connectDB;
