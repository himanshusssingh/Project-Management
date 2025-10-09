import express, { json } from 'express';
import cors from 'cors';
import  healthcheckRouter  from './routes/healthcheck.routes.js';
import registerRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser";



const app = express();

//Basic Configuration
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

//CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",")  || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorisaton"],
}))

//router
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", registerRouter);



app.get("/", (req, res) => {
    res.send('Welcome Broooo!') ;
})



export default app;