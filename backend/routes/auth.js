import express from "express";
import dotenv from "dotenv";
import { db } from "../firebase.js";

import { arrayUnion, updateDoc, doc, setDoc, collection } from 'firebase/firestore';


dotenv.config();
const router = express.Router();

// POST: add a recipe id to user's favorites 
router.post("/:uid/:rid", async (req, res) => {
    const uid = req.params.uid;
    const rid = req.params.rid;
    const rec = req.body;
    console.log(rec);
    console.log(rid);
    try {
      rec['cuisineType'] = rec['cuisineType'][0];
      rec['desc'] = '';
      rec['img'] = rec['image'];
      // delete rec['image'];
      rec['mealType'] = rec['meal'][0];
      // delete rec['meal'];
      rec['nutritionFacts'] = rec['nutrients'];
      // delete rec['nutrients'];
      rec['steps'] = `To view steps follow the link: ${rec['url']}`
      await updateDoc(doc(db, 'users', uid), {
        favoriteMeals: arrayUnion(rid),
      });
      const docRef = await setDoc(doc(db, 'recipes', rid), rec);
      res.status(200).send({ message: `Recipe added to favorites with id: ${docRef.id}` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})

export default router;