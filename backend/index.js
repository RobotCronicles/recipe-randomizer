const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const recipes = [
  { id: 1, name: 'Pasta', ingredients: ['pasta', 'tomato', 'cheese'] },
  { id: 2, name: 'Salad', ingredients: ['lettuce', 'tomato', 'cucumber'] },
  // Add more recipes as needed
];

// Endpoint to get a random recipe based on ingredients
app.post('/api/random-recipe', (req, res) => {
  const { ingredients } = req.body;
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredients.includes(ingredient))
  );

  if (filteredRecipes.length === 0) {
    return res.status(404).json({ message: 'No recipes found for those ingredients.' });
  }

  const randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
  res.json(randomRecipe);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});