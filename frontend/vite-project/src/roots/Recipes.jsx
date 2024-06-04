import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, TextField, IconButton } from '@mui/material';

const Recipes = () => {
  const [recipes, setRecipes] = useState([{}]);
  const [type, setType] = useState("")
  const cuisineOptions = [
    "American", "Asian", "British", "Caribbean", "Central Europe", 
    "Chinese", "Eastern Europe", "French", "Indian", "Italian", 
    "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", 
    "Nordic", "South American", "South East Asian"
  ];
  const mealOptions = [
    "Breakfast", "Lunch", "Dinner", "Snack", "Teatime"
  ];

  const handleClick = async (cuisine) => {
    try {
      setType(cuisine);
      // Handle button click logic here
      const response = await axios.get(`http://localhost:5001/api/recipes/cuisine/${cuisine}`);
      
      // Process edamamResults
      response.data.edamamResults.forEach(recipe => {
        const name = recipe.recipe.label;
        const meal = recipe.recipe.mealType;
        const image = recipe.recipe.image;
        const time = recipe.recipe.totalTime;
      
        const recipeObj = {
          name: name,
          meal: meal,
          image: image,
          time: time
        };
        setRecipes(prevRecipes => [...prevRecipes, recipeObj]);
      });
      
      // Process firestoreResults
      response.data.firestoreResults.forEach(recipe => {
        const name = recipe.name;
        const meal = recipe.mealType;
        const image = recipe.image ? recipe.image : null;
        const time = recipe.totalTime ? recipe.totalTime : null;
      
        const recipeObj = {
          name: name,
          meal: meal,
          image: image,
          time: time
        };
        setRecipes(prevRecipes => [...prevRecipes, recipeObj]);
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ margin: '20px' }}>
  <div>
    <h1>Browse Recipes</h1>
  </div>
  <Card sx={{ width: '100%' }}>
    <CardContent sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
      {cuisineOptions.map((cuisine, index) => (
        <Button variant="contained" color="primary" onClick={() => handleClick(cuisine)} key={cuisine} sx={{ mx: 1, my: 1 }}>
          {cuisine}
        </Button>
      ))}
    </CardContent>
  </Card>

  <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
  <p>Explore {type}</p>
  <CardContent sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
    {mealOptions.map((meal, index) => (
      <div key={index} sx={{ marginRight: '10px', marginBottom: '10px' }}>{meal}</div>
    ))}
  </CardContent>
</Card>



</Box>
  );
};

export default Recipes;
