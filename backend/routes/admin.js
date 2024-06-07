import express from 'express';
import { db } from './../firebase.js';
import { collection, getDocs, doc, getDoc, deleteDoc, addDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

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
    if (!recipeId) {
      console.error('Recipe ID is undefined');
      res.status(400).send('Recipe ID is required');
      return;
    }
    console.log('Recipe ID:', recipeId);
    
    const pendingRecipeDoc = doc(db, 'pending_recipes', recipeId);
    const recipeDoc = await getDoc(pendingRecipeDoc);

    if (!recipeDoc.exists()) {
      console.error('Recipe not found:', recipeId);
      res.status(404).send('Recipe not found');
      return;
    }

    const recipeData = recipeDoc.data();
    const userId = recipeData.createdBy;

    if (!userId) {
      console.error('User ID is undefined in the recipe data');
      res.status(400).send('User ID is required in the recipe data');
      return;
    }
    console.log('User ID:', userId);

    // Add the recipe to the 'recipes' collection
    const newRecipeDocRef = await addDoc(collection(db, 'recipes'), recipeData);

    // Get the user document
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error('User not found:', userId);
      res.status(404).send('User not found');
      return;
    }

    const userData = userDoc.data();
    const myRecipes = userData.myRecipes || [];
    const pendingRecipes = userData.pendingRecipes || [];

    // Update the user's 'myRecipes' and 'pendingRecipes' fields
    await updateDoc(userDocRef, {
      myRecipes: arrayUnion(newRecipeDocRef.id),
      pendingRecipes: arrayRemove(recipeId)
    });

    // Remove the recipe from the 'pending_recipes' collection
    await deleteDoc(pendingRecipeDoc);

    res.status(200).send('Recipe accepted and moved to recipes collection');
  } catch (error) {
    console.error('Error accepting recipe:', error);
    res.status(500).send(`Error accepting recipe: ${error.message}`);
  }
});

export default router;
