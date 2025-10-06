import express, { json } from 'express';
import cors from 'cors';
import  healthcheckRouter  from './routes/healthcheck.routes.js';


const app = express();

//Basic Configuration
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))

//CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",")  || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorisaton"],
}))

//healthcheck router
app.use("/api/v1/healthcheck", healthcheckRouter);


app.get("/", (req, res) => {
    res.send('Welcome Broooo!') ;
})



export default app;