import axios from "axios";
import express from 'express';
import dotenv from "dotenv";
import { db } from "../firebase.js";

import { collection, getDocs, query, where } from "firebase/firestore";

dotenv.config();
const router = express.Router();
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// GET: recipe page detail filtered by cuisine type
router.get('/cuisine/:cuisineType', async (req, res) => {
    const cuisineType = req.params.cuisineType;
    try {
        // Retrieve recipes from Edamam
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&cuisineType=${cuisineType}`);
        const edamamResults = response.data.hits;

        // Retrieve recipes from Firestore
        const q = query(collection(db, 'recipes'), where('cuisineType', '==', cuisineType));
        const querySnapshot = await getDocs(q);
        const firestoreResults = [];

        querySnapshot.forEach((doc) => {
            firestoreResults.push({
                name: doc.data().name,
                mealType: doc.data().mealType
            });
        });

        res.status(200).json({ edamamResults, firestoreResults });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// GET: recipe page detail filtered by meal type
router.get('/meal/:mealType', async (req, res) => {
    const mealType = req.params.mealType;
    try {
        // Retrieve recipes from Edamam
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&mealType=${mealType}`);
        const edamamResults = response.data.hits;

        // Retrieve recipes from Firestore
        const q = query(collection(db, 'recipes'), where('mealType', '==', mealType));
        const querySnapshot = await getDocs(q);
        const firestoreResults = [];

        querySnapshot.forEach((doc) => {
            firestoreResults.push({
                name: doc.data().name,
                mealType: doc.data().mealType
            });
        });

        res.status(200).json({ edamamResults, firestoreResults });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
