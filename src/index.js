import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js';

dotenv.config(
    { path: './config/.env' }
)

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000} and connected to database ${process.env.DB_NAME}`);
    })
})
.catch((err) => {
    console.log('MongoDB connection failed ', err);
})


/*
import express from 'express';
const app = express();

( async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (err) => {
            console.error('Error occurred:', err);
            throw err;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT} and connected to database ${DB_NAME}`);
        });
        
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
})()
*/