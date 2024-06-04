import express from "express";
import util from "util";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const requestGet = util.promisify(request.get);
const router = express.Router();

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// get diff categories
router.get("/:cat", async (req, res) => {
  console.log("get categories");
  var options = {
    url: "https://api.edamam.com/api/recipes/v2",
    headers: {
      app_id: app_id,
      app_key: app_key,
      type: "public",
      dish_type: "sweets",
    },
    json: true,
  };

  const userInfoResponse = await requestGet(options);
  console.log(userInfoResponse);
});

// get search results
router.get("/?q=:search", async (req, res) => {
  console.log("get search results");
  var options = {
    url: "https://api.edamam.com/api/recipes/v2",
    headers: {
      app_id: app_id,
      app_key: app_key,
      type: "public",
      // temporary placeholder for query text
      q: "chicken",
    },
  };

  const user_searchResponse = await requestGet(options);
  const user_search = user_searchResponse.body;
  console.log(user_search);
  console.log("work");
});

export default router;
