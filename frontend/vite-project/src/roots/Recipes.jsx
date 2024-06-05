import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  Select,
  MenuItem,
  CardContent,
  Button,
  Grid,
  Typography,
  CardMedia,
  TextField,
} from "@mui/material";

// Notes:
// stored fetching URL
const Recipes = () => {
  const [allrecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [type, setType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterByEdamam, setFilterByEdamam] = useState(true); // Initially, filter by Edamam
  const cuisineOptions = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ];
  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];
  // setting the array for result of recipes with the keyword
  const [searchResults, setSearchResults] = useState([]);

  
  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/recipes/cuisine/all`
      );

      const newRecipes = [];

      // Process edamamResults
      response.data.edamamResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.recipe.label,
          meal: recipe.recipe.mealType,
          image: recipe.recipe.image,
          time: recipe.recipe.totalTime,
          id: recipe._links.self.href,
          userMade: false,
        };
        newRecipes.push(recipeObj);
      });

      // Process firestoreResults
      response.data.firestoreResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.name,
          meal: recipe.mealType,
          image: recipe.image || null,
          time: recipe.totalTime || null,
          id: null,
          userMade: true,
        };
        newRecipes.push(recipeObj);
      });

      setAllRecipes(newRecipes);
      // Set recipes to the full list initially
      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // function to fetch recipes based on cuisine type
  const fetchRecipes = async (cuisine) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/recipes/cuisine/${cuisine}`
      );

      const newRecipes = [];

      // Process edamamResults
      response.data.edamamResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.recipe.label,
          meal: recipe.recipe.mealType,
          image: recipe.recipe.image,
          time: recipe.recipe.totalTime,
          id: recipe._links.self.href,
          userMade: false,
        };
        newRecipes.push(recipeObj);
      });

      // Process firestoreResults
      response.data.firestoreResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.name,
          meal: recipe.mealType,
          image: recipe.image || null,
          time: recipe.totalTime || null,
          id: null,
          userMade: true,
        };
        newRecipes.push(recipeObj);
      });

      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleClick = (cuisine) => {
    setType(cuisine);
  };

  useEffect(() => {
    if (type) {
      setRecipes([]); // Reset recipes state
      fetchRecipes(type);
    } else {
      fetchAllRecipes();
    }
  }, [type]);

  const handleSave = (recipe) => {
    // TODO: save the recipe to firebase
    console.log("Recipe saved:", recipe);
  };

  const handleSubmit = async () => {
    // to do: search for recipes that contain keyword
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5001/home/search/${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMealType = async (meal) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/recipes/meal/${meal}/${type}`
      );

      const newRecipes = [];

      // Process edamamResults
      response.data.edamamResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.recipe.label,
          meal: recipe.recipe.mealType,
          image: recipe.recipe.image,
          time: recipe.recipe.totalTime,
          id: recipe._links.self.href,
          userMade: false,
        };
        newRecipes.push(recipeObj);
      });

      // Process firestoreResults
      response.data.firestoreResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.name,
          meal: recipe.mealType,
          image: recipe.image || null,
          time: recipe.totalTime || null,
          id: null,
          userMade: true,
        };
        newRecipes.push(recipeObj);
      });

      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleFilterByEdamam = () => {
    setFilterByEdamam(true);
  };

  const handleFilterByUser = () => {
    setFilterByEdamam(false);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterByEdamam ? !recipe.userMade : recipe.userMade)
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ margin: "20px" }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Browse Recipes
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              marginLeft: "250px",
              marginBottom: "5px",
              display: "flex",
              alignItems: "left",
            }}
          >
            <TextField
              label="Search Recipes"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: "70%", marginRight: "10px" }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: "purple" }}
            >
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "20px", color: "purple" }}>
              Filter by:
            </Typography>
            <Select
              value={filterByEdamam ? "edamam" : "user"}
              onChange={(e) =>
                e.target.value === "edamam"
                  ? handleFilterByEdamam()
                  : handleFilterByUser()
              }
              sx={{
                width: "120px",
                "& .MuiSelect-icon": { color: "purple" },
                "& .MuiSelect-select": {
                  color: "purple",
                  borderColor: "purple",
                  "&:focus": { borderColor: "purple" }, // Override focused state border color
                },
              }}
            >
              <MenuItem value="edamam" sx={{ color: "purple" }}>
                Edamam
              </MenuItem>
              <MenuItem value="user" sx={{ color: "purple" }}>
                User
              </MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>

      <Card sx={{ width: "100%", marginBottom: "20px" }}>
        <CardContent
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {cuisineOptions.map((cuisine) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClick(cuisine)}
              key={cuisine}
              sx={{ mx: 1, my: 1, backgroundColor: "#2e6123" }}
            >
              {cuisine}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <CardContent
          sx={{ marginLeft: "50px", textAlign: "left", flexGrow: 1 }}
        >
          <Typography variant="h6">Explore {type}</Typography>
        </CardContent>
        <CardContent>
          {mealOptions.map((meal, index) => (
            <Button
              key={index}
              onClick={() => handleMealType(meal)}
              sx={{
                textTransform: "capitalize",
                marginRight: "50px",
                borderRadius: 0,
                border: 0,
                backgroundColor: "transparent",
                color: "#2e6123",
              }}
            >
              {meal}
            </Button>
          ))}
        </CardContent>
      </Card>

      {recipes.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginBottom: "20px", cursor: "pointer" }}
        >
          Search up your favorite recipes right now!
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredRecipes.map((recipe, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link
                to={{
                  pathname: `/RecipeView`, // TODO: change to detail page
                  state: { recipeURI: recipe.id },
                }}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.image}
                    alt={recipe.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{recipe.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Meal Type: {recipe.meal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time Takes: {recipe.time} mins
                    </Typography>
                  </CardContent>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleSave(recipe)}
                    >
                      Save
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Recipes;
