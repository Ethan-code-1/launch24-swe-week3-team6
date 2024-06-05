import express from "express";
import util from "util";
import request from "request";
import dotenv from "dotenv";

const requestGet = util.promisify(request.get);
const router = express.Router();
dotenv.config();

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// get diff categories
router.get("/:cat", async (req, res) => {
  try {
    const cat = req.params.cat;
    console.log(cat);
    console.log("get categories");
    var url = new URL("https://api.edamam.com/api/recipes/v2");
    url.searchParams.set("app_id", app_id);
    url.searchParams.set("app_key", app_key);
    url.searchParams.set("type", "public");

    switch (cat) {
      case "mexican":
        url.searchParams.set("cuisineType", "mexican");
        break;
      case "vegan":
        url.searchParams.set("health", "vegan");
        break;
      case "desserts":
        url.searchParams.set("dishType", "desserts");
        break;
      case "keto":
        url.searchParams.set("health", "keto-friendly");
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
    res.status(500).send({ error: "Error fetching messages" });
  }
});

router.get("/search/:q", async (req, res) => {
  //console.log("get search results");
  // searchQuery dependent on what ingredient the user is looking for (e.g. "chicken", "corn")
  const searchQuery = req.params.q;

  const url = new URL("https://api.edamam.com/api/recipes/v2");
  url.searchParams.set("app_id", app_id);
  url.searchParams.set("app_key", app_key);
  url.searchParams.set("type", "public");
  url.searchParams.set("q", searchQuery);

  try {
    const user_searchResponse = await requestGet(url.href);
    // parsing the string of all information into objects
    const user_search = JSON.parse(user_searchResponse.body);
    console.log(user_search);
    let usersearchdata = [];

    // grabbing specific/most necessary data objects (name, image, ingredients, link to webpage that has ingredients)
    if (user_search.hits) {
      user_search.hits.forEach((hit) => {
        let searchedrecipeinfo = {};
        searchedrecipeinfo.recipe_name = hit.recipe.label;
        searchedrecipeinfo.recipe_img = hit.recipe.image;
        searchedrecipeinfo.recipe_ingredients = hit.recipe.ingredientLines;
        searchedrecipeinfo.recipe_link = hit.recipe.url;
        searchedrecipeinfo.recipe_id = hit.recipe.url;

        usersearchdata.push(searchedrecipeinfo);
        console.log(searchedrecipeinfo);
      });
      // error capturing
    } else {
      console.log("No hits found in the search results");
    }
    res.json(usersearchdata);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    res.status(500).send("Failed to fetch search results");
  }
});

export default router;
