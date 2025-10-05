import express, { json } from 'express';


const app = express();

//Basic Configuration
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))



app.get("/", (req, res) => {
    res.send('Welcome Broooo!') ;
})



export default app;