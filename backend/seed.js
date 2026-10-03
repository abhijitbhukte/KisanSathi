const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        phoneNumber: '9876543210',
        name: 'Ramesh Farmer',
        location: 'Pune, Maharashtra',
        preferredLanguage: 'mr',
        password: 'password123', // Will be hashed by pre-save if done one by one, but insertMany bypasses hooks. Let's do it loop for hashing.
      },
      {
        phoneNumber: '9998887776',
        name: 'Suresh Patil',
        location: 'Amritsar, Punjab',
        preferredLanguage: 'pa',
        password: 'password123',
      }
    ]);

    // To ensure passwords are hashed, we create them individually rather than insertMany
    await User.deleteMany();
    
    await User.create({
      phoneNumber: '9876543210',
      name: 'Ramesh Farmer',
      location: 'Pune, Maharashtra',
      preferredLanguage: 'mr',
      password: 'password123',
    });

    await User.create({
      phoneNumber: '9998887776',
      name: 'Suresh Patil',
      location: 'Amritsar, Punjab',
      preferredLanguage: 'pa',
      password: 'password123',
    });

    console.log('Demo Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
