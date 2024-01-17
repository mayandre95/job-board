import express from 'express';
import cors from 'cors'

const app= express();


app.use(express.urlencoded({ extended: true }));


import dotenv from 'dotenv';
dotenv.config()

//Database and  authenticateUser
import connectDB from './database/connect.js';

//Routers
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

//MDW
import notFoundMDW from './middleware/not-found.js';
import Errorhandler from './middleware/error-handler.js';


//MDW interserver
const corsOptions = {
    origin: 'http://localhost:3000', // The origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, etc.)
    optionsSuccessStatus: 204, // Some legacy browsers (IE) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json())

// app.get('/', (req,res)=>{
//     res.send('<h1>Welcome</h1>')
// })

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/jobs',jobRoutes)
app.use('/api/v1/admin',adminRoutes)


app.use(notFoundMDW)
app.use(Errorhandler)

const port = 4000 //process.env.PORT

// app.listen(port,()=>{
//     console.log(`Server is listening on port ${port}...`)
// })

const start = async ()  => {
    try {
        await connectDB;
        app.listen(port,()=>{
            console.log(`Server is listening on port http://localhost:${port}...`)
        })
    } catch (err) {
        console.log('Database connection failed: ' + err.stack);
        return
    }
}

start()