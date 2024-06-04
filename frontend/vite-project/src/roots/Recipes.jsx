import {useState, useEffect} from 'react';
import axios from 'axios';


const Recipes = () => {
  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const cuisineType = "Chinese"
        const response = await axios.get(`http://localhost:5001/api/recipes/cuisine/${cuisineType}`);
        //setRecipes(response.data);
        console.log(response.data);
    };

    fetchData();
  }, []);



  return (
    <div>
      <h1>recipes</h1>
    </div>
  );
};

export default Recipes;
