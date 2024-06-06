import express from 'express';
import { db } from './../firebase.js';
import { collection, getDocs, doc, getDoc, deleteDoc, addDoc } from 'firebase/firestore';

const router = express.Router();

router.get('/pending_recipes', async (req, res) => {
  try {
    const recipesRef = collection(db, 'pending_recipes');
    const recipesSnapshot = await getDocs(recipesRef);
    const recipes = recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Error fetching recipes');
  }
});

router.post('/accept_recipe/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const pendingRecipeDoc = doc(db, 'pending_recipes', recipeId);
    const recipeDoc = await getDoc(pendingRecipeDoc);

    if (recipeDoc.exists()) {
      console.log('Recipe data:', recipeDoc.data());
      await addDoc(collection(db, 'recipes'), recipeDoc.data());
      await deleteDoc(pendingRecipeDoc);
      res.status(200).send('Recipe accepted and moved to recipes collection');
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (error) {
    console.error('Error accepting recipe:', error);
    res.status(500).send(`Error accepting recipe: ${error.message}`);
  }
});

export default router;
