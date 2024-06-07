import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, TextField, IconButton, Modal, Autocomplete, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/MyRecipes.css';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storage } from "./../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';


const RecipeCard = (recipe) => {
    const [showYourRecipes, setShowYourRecipes] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [addingNewRecipe, setAddingNewRecipe] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [mealType, setMealType] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uid, setUid] = useState('');
    const [yourRecipes, setYourRecipes] = useState([]);
    const [favoritedRecipes, setFavoritedRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [pendingRecipes, setPendingRecipes] = useState([]);

    recipe = recipe.recipe;
    console.log(recipe);

    const cuisineTypes = [
        'American', 'Asian', 'British', 'Caribbean', 'Central European', 'Chinese',
        'Eastern European', 'French', 'Greek', 'Indian', 'Italian', 'Japanese',
        'Korean', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic',
        'South American', 'South East Asian', 'World'
      ];
    
      const mealTypes = ['Breakfast', 'Brunch', 'Lunch/Dinner', 'Snack', 'Teatime'];
    
      const getRecipes = () => {
        const recipes = showYourRecipes ? yourRecipes : favoritedRecipes;
        return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()));
      };
    
      async function fetchFavoritedRecipes(uid) {
        try {
          const result = await axios.get(`http://localhost:5001/myRecipes/favorites/${uid}`);
          setFavoritedRecipes(result.data);
          console.log("result", result.data);
        } catch (error) {
          console.error('Error fetching favorited recipes:', error);
        }
      }
    
      const handleUnfavorite = async (recipeId) => {
        try {
          await axios.post('http://localhost:5001/myRecipes/unfavorite', { uid, recipeId });
          setFavoritedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
          alert(`Unfavorited recipe with ID: ${recipeId}`);
        } catch (error) {
          console.error('Error unfavoriting recipe:', error);
        }
      };
    
      const handleEdit = (recipe) => {
        setEditingRecipe(recipe);
        console.log(editingRecipe);
      };
    
      const handleSave = async (rid) => {
        editingRecipe['img'] = await getImg();
        console.log(editingRecipe);
        const r = await axios.put(`http://localhost:5001/myRecipes/edit/${rid}`, editingRecipe);
        console.log(r);
        await fetchCreatedRecipes(uid);
        setEditingRecipe(null);
      };
    
      const toggleAddNewRecipe = () => {
        setAddingNewRecipe(!addingNewRecipe);
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };
    
      async function getImg() {
        const imgRef = ref(storage, `recipeImages/${v4()}`);
        const imgSnapshot = await uploadBytes(imgRef, image);
        return await getDownloadURL(imgSnapshot.ref);
      }
    
      async function handleSubmit() {
        console.log('Submitted', uid);
        console.log('Image:', image); 
        const downloadUrl = await getImg();
    
        const data = {
            'name': title,
            'desc': desc,
            'cuisineType': cuisineType,
            'mealType': mealType,
            'uid': uid,
            'img': downloadUrl
        }
        console.log(data);
        
        try {
          const result = await axios.post(`http://localhost:5001/myRecipes/draft`, data);
          console.log('Document Reference:', result.data.docRef);
          console.log('Document ID:', result.data.docId); // This will log the document ID
          
          const nutritionData = {
                ...data,
                docId: result.data.docId
          };
          
          const nutrition = await axios.post(`http://localhost:5001/myRecipes/nutrition`, nutritionData);
          console.log(nutrition);
          console.log(result);
    
          alert("Recipe added!");
          await fetchCreatedRecipes(uid);
          toggleAddNewRecipe();
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert("Failed to add recipe!");
        }
    }
    
      async function fetchCreatedRecipes(uid) {
        console.log(uid);
        const result = (await axios.get(`http://localhost:5001/myRecipes/created/${uid}`)).data;
        setYourRecipes(result.recipes);
        setPendingRecipes(result.pending_recipes);
        console.log(result);
      }
    
      // async function fetchPendingRecipes(uid) {
      //   try {
      //     const result = await axios.get(`http://localhost:5001/myRecipes/pending/${uid}`);
      //     setPendingRecipes(result.data);
      //   } catch (error) {
      //     console.error('Error fetching pending recipes:', error);
      //   }
      // }
    
      const handleDelete = async (recipeId, isPending) => {
        try {
          const endpoint = isPending ? `http://localhost:5001/myRecipes/pending/${recipeId}` : `http://localhost:5001/myRecipes/${recipeId}`;
          await axios.delete(endpoint, { data: { uid } });
          if (isPending) {
            setPendingRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
          } else {
            setYourRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
          }
          alert('Recipe deleted successfully');
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      };
      
    
      useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUid(user.uid);
            fetchCreatedRecipes(user.uid);
            fetchFavoritedRecipes(user.uid);
            // fetchPendingRecipes(user.uid);
          } else {
            //alert('Not logged in');
          }
        });
      }, [])
  return (
    <Card className="recipe-card">
                <Box sx={{ position: 'relative' }}>
                  {showYourRecipes && (
                    <IconButton
                      aria-label="edit"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents the default anchor tag action
                        e.stopPropagation(); // Stops the propagation to parent elements
                        handleEdit(recipe);
                      }}
                      sx={{ position: 'absolute', top: '0', right: '0', zIndex: 1000 }}
                    >
                      <EditIcon style={{ zIndex: 200, color: 'white', background: '#0000006b' }} />
                    </IconButton>
                  )}
                  {!showYourRecipes && (
                    <IconButton
                      aria-label="unfavorite"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents the default anchor tag action
                        e.stopPropagation(); // Stops the propagation to parent elements
                        handleUnfavorite(recipe.id);
                      }}
                      sx={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}
                      style={{ color: '#ff0000', background: '#0000006b' }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default anchor tag action
                      e.stopPropagation(); // Stops the propagation to parent elements
                      handleDelete(recipe.id, false);
                    }}
                    sx={{ position: 'absolute', bottom: '0', right: '0', zIndex: 1000 }}
                  >
                    <DeleteIcon style={{ zIndex: 200, color: 'white', background: '#0000006b' }} />
                  </IconButton>
                  <CardMedia
                    component="img"
                    sx={{ height: 140, borderBottom: '7px solid #2e6123', minHeight: '18vh', maxHeight: '18vh' }}
                    image={recipe.img}
                    alt={recipe.name}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6">{recipe.title}</Typography>
                  {recipe.author && (
                    <Typography variant="subtitle2" color="text.secondary">Author: {recipe.author}</Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {recipe.desc.length > 40 ? `${recipe.desc.substring(0, 40)}...` : recipe.desc}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Cuisine: {recipe.cuisineType}</Typography>
                  <Typography variant="body2" color="text.secondary">Meal Type: {recipe.mealType}</Typography>
                </CardContent>
              </Card>
  )
}

export default RecipeCard