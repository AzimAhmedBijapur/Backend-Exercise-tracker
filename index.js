import express from 'express';
import {PORT, mongoURL} from './config.js';
import mongoose from 'mongoose';
import router from './routes/routes.js';
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors())
app.use('/',router);

mongoose.connect(mongoURL)
.then(()=>{
    console.log('Connected to db');
    app.listen(PORT,()=>{
        console.log('Listening to port 5000');
    })
})
.catch((err)=>{
    console.log(err);
})