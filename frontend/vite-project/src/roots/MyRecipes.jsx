import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, TextField, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit'; 
import '../styles/MyRecipes.css';

const MyRecipes = () => {
  const [showYourRecipes, setShowYourRecipes] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addingNewRecipe, setAddingNewRecipe] = useState(false); 

  const yourRecipes = [
    { id: 1, title: 'Your Recipe 1', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1' },
    { id: 2, title: 'Your Recipe 2', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1' },
  ];

  const favoritedRecipes = [
    { id: 1, title: 'Favorited Recipe 1', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1', author: 'Author 1' },
    { id: 2, title: 'Favorited Recipe 2', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1', author: 'Author 2' },
    { id: 3, title: 'Favorited Recipe 3', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1', author: 'Author 3' },
    { id: 4, title: 'Favorited Recipe 4', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1', author: 'Author 4' },
    { id: 5, title: 'Favorited Recipe 5', imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1', author: 'Author 5' },
  ];

  const getRecipes = () => {
    const recipes = showYourRecipes ? yourRecipes : favoritedRecipes;
    return recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleUnfavorite = (recipeId) => {
    alert(`Unfavorited recipe with ID: ${recipeId}`);
  };

  const handleOpenRecipe = (recipeId) => {
    alert(`Opening recipe with ID: ${recipeId}`);
  };

  const handleEdit = (recipeId) => {
    alert(`Editing recipe with ID: ${recipeId}`);
  };

  const toggleAddNewRecipe = () => {
    setAddingNewRecipe(!addingNewRecipe);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {showYourRecipes ? 'Recipes you Created:' : 'Recipes you Favorited:'}
      </Typography>

      <Card sx={{ width: '100%', mb: 4 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search"
            variant="outlined"
            sx={{ mr: 2, flex: '1' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'flex-end' }}>
            <Button
              variant={showYourRecipes ? 'contained' : 'outlined'}
              onClick={() => setShowYourRecipes(true)}
              sx={{
                mr: 1,
                bgcolor: showYourRecipes ? '#2e6123' : 'transparent',
                color: showYourRecipes ? 'white' : '#2e6123',
                '&:hover': {
                  bgcolor: showYourRecipes ? '#1e4a1c' : '#2e6123',
                  color: 'white',
                },
              }}
            >
              Your Recipes
            </Button>
            <Button
              variant={!showYourRecipes ? 'contained' : 'outlined'}
              onClick={() => setShowYourRecipes(false)}
              sx={{
                bgcolor: !showYourRecipes ? '#2e6123' : 'transparent',
                color: !showYourRecipes ? 'white' : '#2e6123',
                '&:hover': {
                  bgcolor: !showYourRecipes ? '#1e4a1c' : '#2e6123',
                  color: 'white',
                },
              }}
            >
              Favorited Recipes
            </Button>
          </Box>
        </CardContent>
      </Card>

      {showYourRecipes && (
        <Button
          onClick={toggleAddNewRecipe}
          sx={{
            mb: 2,
            bgcolor: '#2e6123',
            color: 'white',
            '&:hover': {
              bgcolor: '#1e4a1c',
            },
          }}
        >
          {addingNewRecipe ? 'Cancel' : 'Want to add a recipe?'}
        </Button>
      )}

      {addingNewRecipe && (
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h5">Add New Recipe</Typography>
          <TextField fullWidth label="Title" sx={{ mb: 2 }} />
          <TextField fullWidth label="Content" multiline rows={4} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary">Submit</Button>
        </Card>
      )}

      <Grid container spacing={2}>
        {getRecipes().map(recipe => (
          <Grid key={recipe.id} item xs={12} sm={6} md={3}>
            <Card className="recipe-card" onClick={() => handleOpenRecipe(recipe.id)}>
              <Box sx={{ position: 'relative' }}>
                {showYourRecipes && (
                  <IconButton
                    aria-label="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(recipe.id);
                    }}
                    sx={{ position: 'absolute', top: '0', left: '0', zIndex: 1000 }}
                  >
                    <EditIcon style = {{zIndex: 200, color: 'black'}} />
                  </IconButton>
                )}
                {!showYourRecipes && (
                  <IconButton
                    aria-label="unfavorite"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnfavorite(recipe.id);
                    }}
                    sx={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}
                    style={{ color: '#ff0000' }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
                <CardMedia
                  component="img"
                  sx={{ height: 140, borderBottom: '7px solid #2e6123', minHeight: '18vh', maxHeight: '18vh' }}
                  image={recipe.imageUrl}
                  alt={recipe.title}
                />
              </Box>
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                {recipe.author && (
                  <Typography variant="subtitle2" color="text.secondary">Author: {recipe.author}</Typography>
                )}
                <Typography variant="body2" color="text.secondary">Description of the recipe</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyRecipes;
