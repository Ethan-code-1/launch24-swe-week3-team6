import React from 'react'
import '../styles/recipe.css'

const Recipe = (data) => {
  const recipe = data.recipe;
    const nutritionFacts = [
  { value: '508', label: 'calories' },
  { value: '34g', label: 'fat' },
  { value: '12g', label: 'carbs' },
  { value: '25g', label: 'protein' },
  ];
  
  const split = recipe.steps.split('\n');

  let ings =  split.splice(split.indexOf("Ingredients:") + 1, split.indexOf("Instructions:") - 3)
  ings = ings.map((i) => {
    return i.includes(':') ? i : i.slice(2)
  })
  ings = ings.filter((i) => i !== '');

  let instructions = split.splice(split.indexOf("Instructions:"))
  instructions = instructions.map((inst) => {return inst.slice(2)})
  
  const directionSteps = instructions;
  
  const ingredients = ings
  
  return (
    <div className='recipe-section'>
          <div className='recipe-container'>
            <div className='recipe-title'> {recipe.name} </div>
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