import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express()
const port = 5000

app.use(express.json())
app.use(cors());
dotenv.config(); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })