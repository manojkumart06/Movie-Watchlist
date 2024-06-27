import express from 'express';
import connection from './config/dbConfig.js';
import movieRouter from './Routes/movieRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("HOME PAGE");
});

app.use("/movie", movieRouter); // middleware

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected Successfully");
    } catch (err) {
        console.log("Not Connected");
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});
