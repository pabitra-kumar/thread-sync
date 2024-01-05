import mongoose from 'mongoose';

let isConnected = false; // check if mongoose is already connected

export const connectDB = async () => {
//   mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI) return console.log('MONGODB_URL is not defined');

  if(isConnected) {
    console.log('Already connected to MongoDB');
    return;
}

    try {
        // console.log('Connecting to MongoDB...');
        // console.log('MONGODB_URL: ', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error);
    }
};