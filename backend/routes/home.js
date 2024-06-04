import express from "express";
import util from 'util';
import request from 'request';

const requestGet = util.promisify(request.get);
const router = express.Router();

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// get diff categories
router.get('/:cat', async (req, res) => {
    console.log("get categories");
    var options = {
        url: "https://api.edamam.com/api/recipes/v2",
        headers: { app_id: app_id, app_key: app_key, type: 'public', dish_type: "sweets" },
        json: true,
    };

    const userInfoResponse = await requestGet(options);
    console.log(userInfoResponse);
})

// get search results
router.get('home/?q=:search', (req, res) => {
    console.log("get search results");
})

export default router;