const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.log('No MONGODB_URI found. Starting In-Memory Database...');
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log(`In-Memory MongoDB Connected: ${uri}`);
        } else {
            const conn = await mongoose.connect(process.env.MONGODB_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
    } catch (error) {
        console.error(`Error connecting to provided MongoDB: ${error.message}`);
        console.log('Falling back to In-Memory Database...');
        try {
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log(`In-Memory MongoDB Connected (Fallback): ${uri}`);
        } catch (fallbackError) {
            console.error(`In-Memory DB failed: ${fallbackError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
