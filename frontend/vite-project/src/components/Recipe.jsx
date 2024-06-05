import React from 'react'
import '../styles/recipe.css'

const Recipe = () => {
    const nutritionFacts = [
  { value: '508', label: 'calories' },
  { value: '34g', label: 'fat' },
  { value: '12g', label: 'carbs' },
  { value: '25g', label: 'protein' },
  ];
  
  const directionSteps = [
  `Whisk salad dressing, garlic powder, and salt together in a shallow baking dish;
   add chicken breasts and turn to coat. Cover the dish with plastic wrap and marinate in the refrigerator,
   4 hours to overnight.`,
  'Preheat an outdoor grill for high heat and lightly oil the grate.',
  'Remove chicken from marinade and shake off excess; discard remaining marinade.',
  `Cook chicken on the preheated grill until no longer pink in the center and the juices run clear,
   about 7 to 8 minutes on each side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).`,
  ];
  
  const ingredients = [
  '1 (16 ounce) bottle Italian-style salad dressing',
  '1 teaspoon garlic powder',
  '1 teaspoon salt',
  '4 skinless, boneless chicken breast halves',
  ];
  
  return (
    <div className='recipe-section'>
          <div className='recipe-container'>
            <div className='recipe-title'> Italian Chicken Marinade </div>
            <div className='recipe-line'></div>

            <div className='ingredients-container'>
                <div className='recipe-subtitle'> Ingredients </div>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

            <div className='directions-container'>
              <div className='recipe-subtitle'> Directions </div>
              {directionSteps.map((info, index) => (
                <div className='direction-step' key={index}>
                  <div className='direction-title'>Step {index + 1}</div>
                  <div className='direction-info'>{info}</div>
                </div>
              ))}
            </div>

            <div className='nutrition-facts-container'>
              <div className='recipe-subtitle'> Nutrition Facts </div>
              <div className='nutrition-facts-grid'>
                {nutritionFacts.map((fact, index) => (
                  <div className='nutrition-fact' key={index}>
                    <div className='fact-top'>{fact.value}</div>
                    <div className='fact-bottom'>{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
  )
}

export default Recipe