import express from "express";
import dotenv from "dotenv";
import { db } from "../firebase.js";

import { arrayUnion, updateDoc, doc } from 'firebase/firestore';


dotenv.config();
const router = express.Router();

// POST: add a recipe id to user's favorites 
router.post("/:uid/:rid", async (req, res) => {
    const uid = req.params.uid;
    const rid = req.params.rid;
    console.log(uid);
    console.log(rid);
    try {
      await updateDoc(doc(db, 'users', uid), {
        favoriteMeals: arrayUnion(rid),
      });
      res.status(200).send({ message: 'Recipe added to favorites' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})

export default router;