import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import homeRouter from "./routes/home.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5001;

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/home", homeRouter);
dotenv.config();

// access point: https://api.edamam.com/api/recipes/v2

// placeholding the url
const url =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}app_key=${app_key}";

app.use("/home", homeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
