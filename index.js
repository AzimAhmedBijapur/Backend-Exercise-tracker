import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes.js';
import cors from 'cors';
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/',router);

mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log('Connected to db');
    app.listen(process.env.PORT,()=>{
        console.log('Listening to port 5000');
    })
})
.catch((err)=>{
    console.log(err);
})