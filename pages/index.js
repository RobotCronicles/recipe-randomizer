import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const handleFetchRecipe = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/random-recipe', {
        ingredients: ingredients.split(',').map(item => item.trim()),
      });
      setRecipe(response.data);
      setError('');
    } catch (err) {
      setError('No recipes found for those ingredients.');
      setRecipe(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe Randomizer</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleFetchRecipe}>Get Random Recipe</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recipe && (
        <div style={{ marginTop: '20px' }}>
          <h2>{recipe.name}</h2>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
