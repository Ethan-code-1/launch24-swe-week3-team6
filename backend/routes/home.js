import express from "express";
import util from 'util';
import request from 'request';
import dotenv from "dotenv";

const requestGet = util.promisify(request.get);
const router = express.Router();
dotenv.config();

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// get diff categories
router.get('/:cat', async (req, res) => {
    try {
        const cat = req.params.cat;
        console.log(cat);
        console.log("get categories");
        var url = new URL('https://api.edamam.com/api/recipes/v2');
        url.searchParams.set('app_id', app_id);
        url.searchParams.set('app_key', app_key);
        url.searchParams.set('type', 'public');

        switch (cat) {
            case 'mexican':
                url.searchParams.set('cuisineType', 'mexican');
                break;
            case 'vegan':
                url.searchParams.set('health', 'vegan');
                break;
            case 'desserts':
                url.searchParams.set('dishType', 'desserts');
                break;
            case 'keto':
                url.searchParams.set('health', 'keto-friendly');
                break;
            default:
                break;
        }
        console.log(cat, url.href);

        const response = await requestGet(url.href);
        let recipes = JSON.parse(response.body).hits;
        if (recipes.length > 20) {
            recipes = recipes.splice(0, 20);
        }
        res.status(200).send(recipes);
    } catch (e) {
        res.status(500).send({ error: 'Error fetching messages' });
    }
})

// get search results
router.get('home/?q=:search', (req, res) => {
    console.log("get search results");
})

export default router;