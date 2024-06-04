import React, { useState, useEffect } from 'react';
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
  const [allData, setAllData] = useState([]);

  const [saved, setSaved] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showReply, setShowReply] = useState(false); // State for managing reply window visibility
  const [reply, setReply] = useState(""); // State for managing reply content


  const averageRating = 3.5; // Example average rating

  const fetchData = async () => {
    // const response = await axios.get("http://localhost:5001/posts");
    // setAllData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSetSaved = () => {
    setSaved(!saved);
  };

    const handleSetUpvote = () => {
    setUpvote(!upvote);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const toggleReplyWindow = () => {
    setShowReply(!showReply);
  };

  const handlePostReview = async (e) => { // Add the event parameter
    e.preventDefault(); // Prevent the default form submission behavior
    // const id = editID;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestampISO = new Date().toISOString();

    if (review && rating) {
      const body = {
        review: review,
        rating: rating,
        timestamp: timestamp,
        timestampISO: timestampISO
      };

      // const response = await axios.put(`http://localhost:5001/posts/${id}`, body);
      // console.log(`http://localhost:5001/posts/${id}`);
      fetchData();
      clearReview();
    } else {
      alert('please fill in all fields')
    }
  };

  const handleSubmitReply = async (e) => { // Add the event parameter
    e.preventDefault(); // Prevent the default form submission behavior
    // const id = editID;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestampISO = new Date().toISOString();

    if (reply) {
      const body = {
        reply: reply,
        timestamp: timestamp,
        timestampISO: timestampISO
      };

      // const response = await axios.put(`http://localhost:5001/posts/${id}`, body);
      // console.log(`http://localhost:5001/posts/${id}`);
      fetchData();
      clearReply();
    } else {
      alert('please fill in all fields')
    }
  };
  
  
  const clearReview = () => {
    setRating(0);
    setReview("");
  }

  const clearReply = () => {
    setShowReply(false);
    setReply("");
  }


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
    <div className='recipe-view-page'>
      <div className='body'>
        <div className='top-section'>
          <div className='page-title'>Italian Chicken Marinade</div>
          <div className='overview-container'>
            <AverageStars rating={averageRating} className='average-stars'/>
            <div className='page-subtitle'> {averageRating} from 2 votes </div>
            <div className='page-subtitle'> &nbsp; &#124; &nbsp; </div>
            <div className='page-subtitle'> 2 comments</div>
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

        <div className='bottom-section'>

          <div className='review-title'>Reviews</div>
          <div className='review-line'></div>

          <form className='create-review' onSubmit={handlePostReview}>
            <div className='review-top'>
              <div className='review-subtitle'>Your Rating</div>
              <Stars rating={rating} onRatingChange={handleRatingChange} />
            </div>
            <div>
              <textarea className='review-input'
                maxLength="400"
                type="text"
                placeholder='What did you think about this recipe? Join the discussion!'
                value={review} // Bind the input value to the state
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className='review-bottom'>
              <Button id='cancel-button' variant="outlined" onClick={clearReview} >Cancel</Button>
              <Button id='post-button' variant="contained" type='submit'>Post Review</Button>
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
                    <button className='comment-button' onClick={toggleReplyWindow}>
                      <img src={Reply} alt="Reply" className='comment' />
                      <div className='comment-text'>Reply</div>
                    </button>
                  </div>
                </div>

                {showReply && (
                  <div className='reply-window'>
                    <textarea className='review-input'
                      maxLength="400"
                      type="text"
                      placeholder='Write a reply'
                      value={reply} 
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <div className='reply-button-container'>
                      <Button variant="contained" onClick={handleSubmitReply} id='post-button'>Submit Reply</Button>
                    </div>
                  </div>

                )}
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
