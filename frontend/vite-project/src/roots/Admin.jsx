import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Admin = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/admin/pending_recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleReject = async () => {
    try {
      const recipeId = recipes[currentRecipeIndex].id;
      await axios.post(`http://localhost:5001/admin/reject_recipe/${recipeId}`);
      const updatedRecipes = recipes.filter((recipe, index) => index !== currentRecipeIndex);
      setRecipes(updatedRecipes);
      if (currentRecipeIndex >= updatedRecipes.length) {
        setCurrentRecipeIndex(updatedRecipes.length - 1);
      }
      // alert(`Recipe with ID: ${recipeId} rejected`);
    } catch (error) {
      console.error('Error rejecting recipe:', error);
      alert(`Error rejecting recipe: ${error.message}`);
    }
  };

  const handleAccept = async () => {
    try {
      const recipeId = recipes[currentRecipeIndex].id;
      await axios.post(`http://localhost:5001/admin/accept_recipe/${recipeId}`);
      const updatedRecipes = recipes.filter((recipe, index) => index !== currentRecipeIndex);
      setRecipes(updatedRecipes);
      if (currentRecipeIndex >= updatedRecipes.length) {
        setCurrentRecipeIndex(updatedRecipes.length - 1);
      }
      // alert(`Recipe with ID: ${recipeId} accepted`);
    } catch (error) {
      console.error('Error accepting recipe:', error);
      alert(`Error accepting recipe: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    alert('Log out successfully');
    navigate('/login');
  };

  const nextRecipe = () => {
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1);
    }
  };

  const previousRecipe = () => {
    if (currentRecipeIndex > 0) {
      setCurrentRecipeIndex(currentRecipeIndex - 1);
    }
  };

  if (recipes.length === 0) {
    return <Typography variant="h5">No recipes to approve</Typography>;
  }

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3">Admin Page</Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            backgroundColor: '#2e6123',
            color: 'white',
            '&:hover': {
              backgroundColor: '#24551e',
            },
          }}
        >
          Log out
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={previousRecipe} disabled={currentRecipeIndex === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <Card sx={{ cursor: 'pointer' }}>
            <CardMedia
              component="img"
              sx={{ height: 300 }}
              image={currentRecipe.imageUrl}
              alt={currentRecipe.name}
            />
            <CardContent>
              <Typography variant="h6">{currentRecipe.name}</Typography>
              <Typography variant="body2" color="text.secondary">{currentRecipe.desc}</Typography>
              <Typography variant="body2" color="text.secondary">Cuisine Type: {currentRecipe.cuisineType}</Typography>
              <Typography variant="body2" color="text.secondary">Meal Type: {currentRecipe.mealType}</Typography>
              <Typography variant="body2" color="text.secondary">Created By: User</Typography>
              <Typography variant="body2" color="text.secondary">Steps: {Array.isArray(currentRecipe.steps) ? currentRecipe.steps.join(', ') : currentRecipe.steps}</Typography>
              <Typography variant="body2" color="text.secondary">User Made: {currentRecipe.userMade}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkgreen',
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccept();
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject();
                  }}
                >
                  Reject
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <IconButton onClick={nextRecipe} disabled={currentRecipeIndex === recipes.length - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Admin;
