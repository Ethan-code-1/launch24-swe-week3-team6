import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 5001;

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

app.use(express.json());
app.use(cors());
dotenv.config();

// access point: https://api.edamam.com/api/recipes/v2

// placeholding the url
const url =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}app_key=${app_key}";

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
