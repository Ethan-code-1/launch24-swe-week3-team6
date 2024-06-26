import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useParams } from "react-router-dom";
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
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";

const Recipes = () => {
  // for Save Feature
  const [currentUser, setCurrentUser] = useState(null);
  const [flag, setFlag] = useState(false);
  const [notification, setNotification] = useState(false);

  const [recipeHome, setRecipeHome] = useState([]);
  const { category } = useParams();

  const [allRecipes, setAllRecipes] = useState([]);
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
  const [searchResults, setSearchResults] = useState(null);

  const fetchRecipesHome = async () => {
    const response = await axios.get(`http://localhost:5001/home/${category}`);
    const newRecipes = [];

    // Process edamamResults
    response.data.forEach((recipe) => {
      const recipeObj = {
        name: recipe.recipe.label,
        meal: recipe.recipe.mealType,
        image: recipe.recipe.image,
        time: recipe.recipe.totalTime,
        id: extractID(recipe._links.self.href),
        ingredients: recipe.recipe.ingredientLines,
        dishType: recipe.recipe.dishType,
        cuisineType: recipe.recipe.cuisineType,
        author: recipe.recipe.source,
        userMade: false,
        calories: recipe.recipe.calories,
        // Nutritional facts object with keys
        nutrients: {
          carbs: recipe.recipe.totalNutrients.CHOCDF,
          fat: recipe.recipe.totalNutrients.FAT,
          protein: recipe.recipe.totalNutrients.PROCNT,
        },
        url: recipe.recipe.url,
      };
      //console.log(recipe._links.self.href);
      newRecipes.push(recipeObj);
    });
    setRecipes(newRecipes);
  };

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
          id: extractID(recipe._links.self.href),
          ingredients: recipe.recipe.ingredientLines,
          dishType: recipe.recipe.dishType,
          cuisineType: recipe.recipe.cuisineType,
          author: recipe.recipe.source,
          userMade: false,
          calories: recipe.recipe.calories,
          // Nutritional facts object with keys
          nutrients: {
            carbs: recipe.recipe.totalNutrients.CHOCDF,
            fat: recipe.recipe.totalNutrients.FAT,
            protein: recipe.recipe.totalNutrients.PROCNT,
          },
          url: recipe.recipe.url,
        };
        //console.log(recipe._links.self.href);
        newRecipes.push(recipeObj);
      });

      // Process firestoreResults
      response.data.firestoreResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.name,
          meal: recipe.mealType,
          image: recipe.image || null,
          time: recipe.totalTime || null,
          id: recipe.id,
          userMade: recipe.userMade,
        };
        newRecipes.push(recipeObj);
      });

      setAllRecipes(newRecipes);
      // Set recipes to the full list initially
      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // setError("Failed to fetch recipes. Please try again.");
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
          id: extractID(recipe._links.self.href),
          ingredients: recipe.recipe.ingredientLines,
          dishType: recipe.recipe.dishType,
          cuisineType: recipe.recipe.cuisineType,
          author: recipe.recipe.source,
          userMade: false,
          calories: recipe.recipe.calories,
          // Nutritional facts object with keys
          nutrients: {
            carbs: recipe.recipe.totalNutrients.CHOCDF,
            fat: recipe.recipe.totalNutrients.FAT,
            protein: recipe.recipe.totalNutrients.PROCNT,
          },
          url: recipe.recipe.url,
        };
        //console.log(recipe._links.self.href);
        newRecipes.push(recipeObj);
      });

      // Process firestoreResults
      response.data.firestoreResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.name,
          meal: recipe.mealType,
          image: recipe.image || null,
          time: recipe.totalTime || null,
          id: recipe.id,
          userMade: recipe.userMade,
        };
        newRecipes.push(recipeObj);
      });

      setRecipes(newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const extractID = (s) => {
    const regex = /\/api\/recipes\/v2\/([a-f0-9]+)\?/;
    const match = s.match(regex);

    if (match) {
      const recipeId = match[1];
      //console.log(recipeId);
      return recipeId;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user.uid);
        setFlag(false);
        //console.log(user.uid);
      } else {
        // User is signed out
        setFlag(true);
        setCurrentUser(null);
      }
    });

    if (type) {
      setRecipes([]); // Reset recipes state
      fetchRecipes(type);
    } else {
      if (category == null) {
        fetchAllRecipes();
      } else {
        fetchRecipesHome();
      }
    }

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [type]);

  const handleSave = async (recipe) => {
    // TODO: save the recipe to firebase
    // console.log(currentUser);
    // console.log(recipe.id);
    if (currentUser) {
      try {
        // console.log(currentUser, recipe);
        await axios.post(
          `http://localhost:5001/api/auth/save/${currentUser}/${recipe.id}`, recipe
        );
        setNotification(true); // Show notification on successful save
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
  };

  const handleSubmit = async () => {
    // setLoading(true);
    // setError(null);
    try {
      console.log('in submit', searchQuery);
      const response = await axios.get(
        `http://localhost:5001/home/search/${searchQuery}`
      );
      console.log("hello", response.data);
      const recs = response.data.map((recipe) => {
        const recipeObj = {
          name: recipe.recipe.label,
          meal: recipe.recipe.mealType,
          image: recipe.recipe.image,
          time: recipe.recipe.totalTime,
          id: extractID(recipe._links.self.href),
          ingredients: recipe.recipe.ingredientLines,
          dishType: recipe.recipe.dishType,
          cuisineType: recipe.recipe.cuisineType,
          author: recipe.recipe.source,
          userMade: false,
          calories: recipe.recipe.calories,
          // Nutritional facts object with keys
          nutrients: {
            carbs: recipe.recipe.totalNutrients.CHOCDF,
            fat: recipe.recipe.totalNutrients.FAT,
            protein: recipe.recipe.totalNutrients.PROCNT,
          },
          url: recipe.recipe.url,
        };
        return recipeObj;
      });
      console.log('recs', recs);
      setRecipes(recs);
    } catch (error) {
      console.error("Error fetching search results:", error);
      // setError("Failed to fetch search results. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const handleMealType = async (meal) => {
    try {
      console.log("testing");

      let cuisineType = type ? type : "all";
      if (category != null ) {
        cuisineType = category;
      } 
      console.log(cuisineType);
      console.log(meal);
      const response = await axios.get(
        `http://localhost:5001/api/recipes/meal/${meal}/${cuisineType}`
      );

      const newRecipes = [];

      // Process edamamResults
      response.data.edamamResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.recipe.label,
          meal: recipe.recipe.mealType,
          image: recipe.recipe.image,
          time: recipe.recipe.totalTime,
          id: extractID(recipe._links.self.href),
          ingredients: recipe.recipe.ingredientLines,
          dishType: recipe.recipe.dishType,
          cuisineType: recipe.recipe.cuisineType,
          author: recipe.recipe.source,
          userMade: false,
          calories: recipe.recipe.calories,
          // Nutritional facts object with keys
          nutrients: {
            carbs: recipe.recipe.totalNutrients.CHOCDF,
            fat: recipe.recipe.totalNutrients.FAT,
            protein: recipe.recipe.totalNutrients.PROCNT,
          },
          url: recipe.recipe.url,
        };
        //console.log(recipe._links.self.href);
        newRecipes.push(recipeObj);
      });

      // Process firestoreResults
      response.data.firestoreResults.forEach((recipe) => {
        const recipeObj = {
          name: recipe.name,
          meal: recipe.mealType,
          image: recipe.image || null,
          time: recipe.totalTime || null,
          id: recipe.id,
          userMade: recipe.userMade,
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
      <Typography variant="h3" gutterBottom>
        Browse Recipes
      </Typography>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Autocomplete
              options={cuisineOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Cuisine"
                  variant="outlined"
                  sx={{ width: 175, marginRight: "10px" }}
                />
              )}
              value={type}
              onChange={(event, newValue) => {
                setType(newValue);
              }}
            />
            <TextField
              label="Search Recipes"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1, marginRight: "20px", marginLeft: "20px" }} // Flex grow to take available space
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "darkgreen",
                marginRight: "30px",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
              }}
            >
              Search
            </Button>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "10px", color: "darkgreen" }}>
                Filter Recipes By:
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
                  "& .MuiSelect-icon": { color: "darkgreen" },
                  "& .MuiSelect-select": {
                    color: "green",
                    borderColor: "green",
                    "&:focus": { borderColor: "darkgreen" }, // Override focused state border color
                  },
                }}
              >
                <MenuItem value="edamam" sx={{ color: "darkgreen" }}>
                  Official
                </MenuItem>
                <MenuItem value="user" sx={{ color: "darkgreen" }}>
                  User Created
                </MenuItem>
              </Select>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
          marginTop: "15px",
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
                <Link
                  to={`/recipeView/${recipe.id}`}
                  state={filterByEdamam ? { recipe } : null}
                  style={{ textDecoration: "none", color: "inherit" }} // Ensures text color stays as it is
                >
                  {/* <Link
                  to={recipe.userMade
                        ? `recipeView/userCreated/${recipe.id}`
                        : `recipeView/official/${recipe.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}  // Ensures text color stays as it is
                ></Link> */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.image}
                    alt={recipe.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: "inherit" }}>
                      {recipe.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "inherit" }}
                    >
                      Meal Type: {recipe.meal}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "inherit" }}
                    >
                      Time Takes:{" "}
                      {recipe.time === 0 || recipe.time === null
                        ? "N/A"
                        : `${recipe.time} mins`}
                    </Typography>
                  </CardContent>
                </Link>
                <CardContent
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {!flag && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleSave(recipe)}
                    >
                      Save
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={() => setNotification(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert onClose={() => setNotification(false)} severity="success">
          Saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Recipes;
