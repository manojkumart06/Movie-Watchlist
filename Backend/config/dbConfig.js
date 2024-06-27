import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log("Database connection successful");
}).catch((err) => {
  console.error("Database connection error", err);
});

export default connection;
