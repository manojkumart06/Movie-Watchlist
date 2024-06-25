import express from 'express';
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 7001;


app.get("/", (req, res) => {
    res.send("Hi WORLD!");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});