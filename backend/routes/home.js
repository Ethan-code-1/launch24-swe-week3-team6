import express from "express";
const router = express.Router();

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// get diff categories
app.get('/home/:cat', (req, res) => {
    console.log("get categories");
})

// get search results
app.get('home/?q=:search', (req, res) => {
    console.log("get search results");
})

module.exports = router;