import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './routes/user.route.js';
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 8080;
console.log(process.env.PORT)

//this middleware is used to receive request from a specific origin
app.use(cors({origin : "http://localhost:5173" , credentials : true}))
//this middle ware will read req.body 
app.use(express.json()) 
// now we can read form data 
app.use(express.urlencoded({extended : true})) 


app.use('/api/v1/user' , userRoute);


app.listen(PORT , ()=>{console.log(`Server is Running at ${PORT}`)});