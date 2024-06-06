import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipePage from './routes/filter.js';
import homeRouter from './routes/home.js';
import myRecipesRouter from './routes/myRecipes.js';
import recipeRouter from './routes/recipe.js';
import authRouter from './routes/auth.js';
import chatRouter from './routes/chat.js';
import adminRouter from './routes/admin.js';

dotenv.config(); // Ensure dotenv is configured before using environment variables

const app = express();
const port = process.env.PORT || 5001;

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

app.use(express.json());
app.use(cors());

// Initialize Routes
app.use('/api/recipes', recipePage);
app.use('/home', homeRouter);
app.use('/myRecipes', myRecipesRouter);
app.use('/recipe', recipeRouter);
app.use('/api/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/admin', adminRouter);

// access point: https://api.edamam.com/api/recipes/v2
const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}`;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
