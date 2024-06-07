import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import { db } from "../firebase.js";

import { collection, getDocs, query, where } from "firebase/firestore";

dotenv.config();
const router = express.Router();
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// Function to get a random subset of an array
const getRandomSubset = (array, subsetSize) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, subsetSize);
};

// GET: recipe page with random recipes to display
router.get("/cuisine/all", async (req, res) => {
  try {
    // Retrieve random recipes from Edamam
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&q=random`
    );
    const edamamResults = response.data.hits;

    // Retrieve all recipes from Firestore
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const firestoreResults = [];

    querySnapshot.forEach((doc) => {
      firestoreResults.push({
        name: doc.data().name,
        mealType: doc.data().mealType,
        image: doc.data().image || null,
        totalTime: doc.data().totalTime || null,
        id: doc.id,
        userMade: doc.data().userMade,
      });
    });

    // Get a random subset of Firestore results
    const randomFirestoreResults = getRandomSubset(firestoreResults, 15);

    res
      .status(200)
      .json({ edamamResults, firestoreResults: randomFirestoreResults });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET: recipe page detail filtered by cuisine type
router.get("/cuisine/:cuisineType", async (req, res) => {
  const cuisineType = req.params.cuisineType;
  try {
    // Retrieve recipes from Edamam
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&cuisineType=${cuisineType}`
    );
    const edamamResults = response.data.hits;

    // Retrieve recipes from Firestore
    const q = query(
      collection(db, "recipes"),
      where("cuisineType", "==", cuisineType)
    );
    const querySnapshot = await getDocs(q);
    const firestoreResults = [];

    querySnapshot.forEach((doc) => {
      firestoreResults.push({
        name: doc.data().name,
        mealType: doc.data().mealType,
        image: doc.data().image || null,
        totalTime: doc.data().totalTime || null,
        id: doc.id,
        userMade: doc.data().userMade,
      });
    });

    res.status(200).json({ edamamResults, firestoreResults });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET: recipe page detail filtered by meal type
router.get("/meal/:mealType/:cuisineType", async (req, res) => {
  console.log("hello");
  const mealType = req.params.mealType;
  const cuisineType = req.params.cuisineType;
  let response;
  try {
    // Retrieve recipes from Edamam
    // fetch all recipe
    if (cuisineType == "all") {
      console.log("all meals fetch");
      response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&mealType=${mealType}`
      );
    }
    else if (cuisineType == "vegan") {
      response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&health=${cuisineType}`
      );
    }
    else if (cuisineType == "desserts") {
      response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&dishType=${cuisineType}`
      ); 
    }
    else if (cuisineType == "keto") {
      response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&health=keto-friendly`
      ); 
    }
    // type is specified
    else {
      console.log("cuisine type filtered meal fetch");
      response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&cuisineType=${cuisineType}&mealType=${mealType}`
      );
    } 
    const edamamResults = response.data.hits;

    // Retrieve recipes from Firestore
    const q = query(
      collection(db, "recipes"),
      where("mealType", "==", mealType)
    );
    const querySnapshot = await getDocs(q);
    const firestoreResults = [];

    querySnapshot.forEach((doc) => {
      firestoreResults.push({
        name: doc.data().name,
        mealType: doc.data().mealType,
        image: doc.data().image || null,
        totalTime: doc.data().totalTime || null,
        id: doc.id,
        userMade: doc.data().userMade,
      });
    });

    res.status(200).json({ edamamResults, firestoreResults });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
