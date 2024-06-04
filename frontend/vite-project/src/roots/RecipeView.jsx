import React, { useState } from 'react';
import RecipeImage from '../assets/recipe-image.jpeg';
import '../styles/recipe-view.css';

import Bookmark from '../icons/bookmark.png';
import FilledBookmark from '../icons/bookmark-filled.png';
import ChatBubble from '../icons/chat-bubble.png';
import Profile from '../icons/profile-icon.jpeg';
import Upvote from '../icons/upvote-icon.svg';
import UpvoteFilled from '../icons/upvote-icon-filled.png';
import Reply from '../icons/reply.svg';

import { Button } from '@mui/material';
import Stars from '../components/Stars.jsx';
import AverageStars from '../components/AverageStars.jsx';

const RecipeView = () => {
  const [saved, setSaved] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [rating, setRating] = useState(0);
  const averageRating = 3.5; // Example average rating

  const handleSetSaved = () => {
    setSaved(!saved);
  };

    const handleSetUpvote = () => {
    setUpvote(!upvote);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className='recipe-view-page'>
      <div className='body'>
        <div className='top-section'>
          <div className='page-title'>Italian Chicken Marinade</div>
          <div className='overview-container'>
            <AverageStars rating={averageRating} className='average-stars'/>
            <div className='page-subtitle'> {averageRating} from 2 votes </div>
            <div className='page-subtitle'> &nbsp; &#124; &nbsp; </div>
            <div className='page-subtitle'> 12 comments</div>
          </div>

          <img src={RecipeImage} alt='Recipe Image' className='recipe-image' />
          <div className='recipe-info'> This Italian dressing chicken marinade is a super simple but delicious way
            to add flavor before grilling. </div>
        </div>

        <div className='middle-section'>
          <div className='recipe-container'>
            <div className='recipe-title'> Italian Chicken Marinade </div>
            <div className='recipe-line'></div>

            <div className='ingredients-container'>
              <div className='recipe-subtitle'> Ingredients</div>
              <ul>
                <li>1 (16 ounce) bottle Italian-style salad dressing</li>
                <li>1 teaspoon garlic powder</li>
                <li>1 teaspoon salt</li>
                <li>4 skinless, boneless chicken breast halves</li>
              </ul>
            </div>

            <div className='directions-container'>
              <div className='recipe-subtitle'> Directions </div>
              <div className='direction-step'>
                <div className='direction-title'>Step 1</div>
                <div className='direction-info'>
                  Whisk salad dressing, garlic powder, and salt together in a shallow baking dish;
                  add chicken breasts and turn to coat. Cover the dish with plastic wrap and marinate in the refrigerator,
                  4 hours to overnight.
                </div>
              </div>
              <div className='direction-step'>
                <div className='direction-title'>Step 2</div>
                <div className='direction-info'>
                  Preheat an outdoor grill for high heat and lightly oil the grate.
                </div>
              </div>
              <div className='direction-step'>
                <div className='direction-title'>Step 3</div>
                <div className='direction-info'>
                  Remove chicken from marinade and shake off excess; discard remaining marinade.
                </div>
              </div>
              <div className='direction-step'>
                <div className='direction-title'>Step 4</div>
                <div className='direction-info'>
                  Cook chicken on the preheated grill until no longer pink in the center and the juices run clear,
                  about 7 to 8 minutes on each side.
                  An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).
                </div>
              </div>
            </div>

            <div className='nutrition-facts-container'>
              <div className='recipe-subtitle'> Nutrition Facts </div>
              <div className='nutrition-facts-grid'>
                <div className='nutrition-fact'>
                  <div className='fact-top'>508</div>
                  <div className='fact-bottom'>calories</div>
                </div>
                <div className='nutrition-fact'>
                  <div className='fact-top'>34g</div>
                  <div className='fact-bottom'>fat</div>
                </div>
                <div className='nutrition-fact'>
                  <div className='fact-top'>12g</div>
                  <div className='fact-bottom'>carbs</div>
                </div>
                <div className='nutrition-fact'>
                  <div className='fact-top'>25g</div>
                  <div className='fact-bottom'>protein</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bottom-section'>

          <div className='review-title'>Reviews</div>
          <div className='review-line'></div>

          <form className='create-review'>
            <div className='review-top'>
              <div className='review-subtitle'>Your Rating</div>
              <Stars rating={rating} onRatingChange={handleRatingChange} />
            </div>
            <div>
              <textarea className='review-input'
                placeholder='What did you think about this recipe? Join the discussion!'
              />
            </div>
            <div className='review-bottom'>
              <Button id='cancel-button' variant="outlined" >Cancel</Button>
              <Button id='post-button' variant="contained">Post Review</Button>
            </div>
          </form>

          <div className='reviews'> 
            <div className='review-subline'></div>
            
            <div className='review'>
              <div>
                <img src={Profile} alt='User Profile' className='profile-picture'/>
              </div>

              <div>
                <div className='review-info'>
                  <div className='review-username'>Anonymous</div>
                  <div className='review-date'>July 19, 2022</div>
                </div>

                <AverageStars rating={5.0} className='review-stars' />
                <div className='review-comment'>
                  Wow so good!
                </div>

                <div className='review-actions'>
                  <div className='upvote-section'>
                    <button className='upvote-button' onClick={handleSetUpvote}>
                      {upvote ? <img src={UpvoteFilled} alt="Upvote Filled" className='upvote' /> : <img src={Upvote} alt="Upvote" className='upvote' />}
                    </button>

                    <div className='upvote-number'>3</div>
                  </div>

                  <div className='comment-section'>
                    <button className='comment-button'>
                       <img src={Reply} alt="Upvote Filled" className='comment' /> 
                      <div className='comment-text'>Reply</div>
                      
                    </button>

                    
                  </div>
                </div>
                

              </div>
              

            </div>

            <div className='review-subline'></div>


          </div>
        </div>
      </div>

      <div className='left-sidebar'>
        <button className='bookmark-button' onClick={handleSetSaved}>
          {saved ? <img src={FilledBookmark} alt="Filled Bookmark" className='bookmark' /> : <img src={Bookmark} alt="Bookmark" className='bookmark' />}
        </button>
        <button className='chat-button'>
          <img src={ChatBubble} alt='Chat Bubble' className='chat' />
        </button>
      </div>
    </div>
  );
};

export default RecipeView;
