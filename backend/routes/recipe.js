import express from "express";
import dotenv from "dotenv";

import { db } from "./../firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const router = express.Router();
dotenv.config();

// get diff categories
router.get("/:id", async (req, res) => {
  try {
    const rid = req.params.id;
    const recDoc = await getDoc(doc(db, "recipes", rid));
    const rec = recDoc.data();
    res.status(200).json(rec);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// intended for the recipeView page; grabbing the information of stored recipes that we saved. 
// router.get("/stored-recipes", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const docsnap = await getDoc(doc(db, "recipes", id));

//   // Check if the document exists within the collection
//   if (docsnap.exists()) {
//     // Retrieve multiple fields from the document
//     const name = docsnap.data().name;
//     const mealType = docsnap.data().meal_type;

//     // Create an object containing all the retrieved fields
//     const recipeData = {
//       name: name,
//       mealType: mealType,
//     };

//     // Send the recipe data object as a JSON response
//     res.status(200).json(recipeData);
//   } else {
//     // If the document doesn't exist, send a 404 response
//     res.status(404).json({ error: "Document not found" });
//   }
// });

export default router;
