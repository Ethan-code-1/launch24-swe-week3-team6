import React, { useState, useEffect } from 'react';
import RecipeImage from '../assets/recipe-image.jpeg';
import '../styles/recipe-view.css';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
import Recipe from '../components/Recipe.jsx';
import Chatbot from '../components/Chatbot.jsx';

import { useParams } from "react-router-dom";

const RecipeView = () => {
  
  // const [allData, setAllData] = useState([]);

  const [saved, setSaved] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showChat, setShowChat] = useState(false); 
  const [showReply, setShowReply] = useState([]); 
  const [reply, setReply] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [uid, setUid] = useState('');
  const [revs, setRevs] = useState(null);
  const [showReplies, setShowReplies] = useState([]);

  const { rid } = useParams();

  const averageRating = 3.5; // Example average rating

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/recipe/${rid}`);
      // console.log(res.data);
      setRecipe(res.data.rec);
      console.log(res.data.revs);
      setRevs(res.data.revs);
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  useEffect(() => {
    fetchData();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        alert('Not logged in');
      }
    });
  }, []);


  const handleSetSaved = () => {
    setSaved(!saved);
  };

  const handleSetUpvote = () => {
    setUpvote(!upvote);
  };

  const handleSetChatView = () => {
    setShowChat(!showChat);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const toggleReplyWindow = (id, v, f) => {
    console.log(v);
    if (v.includes(id)) {
      let i = v.indexOf(id);
      console.log(i);
      let r = v;
      r.splice(i, 1);
      f(r);
    } else {
      f([...v, id]);
    }
  };

  const handlePostReview = async (e) => { // Add the event parameter
    e.preventDefault(); // Prevent the default form submission behavior
    // const id = editID;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestampISO = new Date().toISOString();

    if (review) {
      const body = {
        review: review,
        // rating: rating,
        timestamp: timestamp,
        timestampISO: timestampISO,
        uid: uid,
        votes: [],
        replies: []
      };

      const response = await axios.put(`http://localhost:5001/recipe/review/${rid}`, body);
      // console.log(`http://localhost:5001/posts/${id}`);
      fetchData();
      clearReview();
    } else {
      alert('please fill in all fields')
    }
  };

  const handleSubmitReply = async (e, id) => { // Add the event parameter
    e.preventDefault(); // Prevent the default form submission behavior
    // const id = editID;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestampISO = new Date().toISOString();

    if (reply) {
      const body = {
        reply: reply,
        timestamp: timestamp,
        timestampISO: timestampISO,
        uid: uid,
        revId: id, // comment (review) id
      };

      const response = await axios.put(`http://localhost:5001/recipe/comment/${rid}`, body);
      console.log(response);
      toggleReplyWindow(id, showReply, setShowReply);
      fetchData();
      clearReply(id);
    } else {
      alert('please fill in all fields')
    }
  };
  
  
  const clearReview = () => {
    setRating(0);
    setReview("");
  }

  const clearReply = (id) => {
    let i = showReply.indexOf(id);
    let r = showReply.splice(i, 1);
    setShowReply(r);
    setReply("");
  }


  return (
    <div className='recipe-view-page'>
      <div className='body'>
        <div className='top-section'>
          <div className='page-title'>{recipe && recipe.name}</div>
          <div className='overview-container'>
            <AverageStars rating={averageRating} className='average-stars'/>
            <div className='page-subtitle'> {averageRating} from 2 votes </div>
            <div className='page-subtitle'> &nbsp; &#124; &nbsp; </div>
            <div className='page-subtitle'> 2 comments</div>
          </div>

          <img src={RecipeImage} alt='Recipe Image' className='recipe-image' />
          <div className='recipe-info'> {recipe && recipe.desc}</div>
        </div>
         {recipe && <Recipe recipe={recipe}/>}
        

        <div className='bottom-section'>

          <div className='review-title'>Reviews</div>
          <div className='review-line'></div>

          <form className='create-review' onSubmit={handlePostReview}>
            {/* <div className='review-top'>
              <div className='review-subtitle'>Your Rating</div>
              <Stars rating={rating} onRatingChange={handleRatingChange} />
            </div> */}
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
          <div className='review-subline'></div>
            {revs && revs.map((rev) => {
              return (
                <div className='reviews'> 
                  
                  <div className='review'>
                    <div>
                      <img src={Profile} alt='User Profile' className='profile-picture'/>
                    </div>
      
                    <div>
                      <div className='review-info'>
                        <div className='review-username'>{rev.user.name}</div>
                        <div className='review-date'>{rev.timestamp}</div>
                      </div>
      
                      <AverageStars rating={5.0} className='review-stars' />
                      <div className='review-comment'>
                        {rev.review}
                      </div>
      
                      <div className='review-actions'>
                        <div className='upvote-section'>
                          <button className='upvote-button' onClick={handleSetUpvote}>
                            {upvote ? <img src={UpvoteFilled} alt="Upvote Filled" className='upvote' /> : <img src={Upvote} alt="Upvote" className='upvote' />}
                          </button>
      
                          <div className='upvote-number'>{rev.replies.length}</div>
                        </div>
                        <div className='review-replies' onClick={() => {toggleReplyWindow(rev.id, showReplies, setShowReplies)}}>
                          <text>View Replies</text>
                        </div>
                        <div className='comment-section'>
                          <button className='comment-button' onClick={() => {toggleReplyWindow(rev.id, showReply, setShowReply)}}>
                            <img src={Reply} alt="Reply" className='comment' />
                            <div className='comment-text'>Reply</div>
                          </button>
                        </div>
                      </div>
      
                      {showReply.includes(rev.id) && (
                        <div className='reply-window'>
                          <textarea className='review-input'
                            maxLength="400"
                            type="text"
                            placeholder='Write a reply'
                            value={reply} 
                            onChange={(e) => setReply(e.target.value)}
                          />
                          <div className='reply-button-container'>
                            <Button variant="contained" onClick={(e) => {handleSubmitReply(e, rev.id)}} id='post-button'>Submit Reply</Button>
                          </div>
                        </div>
      
                      )}
                      <h3>Replies</h3>
                      {showReplies.includes(rev.id) && (rev.replies.map((rep) => {
                        return (
                          <div className='review'>
                            <div>
                              <img src={Profile} alt='User Profile' className='profile-picture'/>
                            </div>

                            <div>
                              <div className='review-info'>
                                <div className='review-username'>{rep.user.name}</div>
                                <div className='review-date'>{rep.time}</div>
                              </div>
                              
                              <AverageStars rating={5.0} className='review-stars' />
                              <div className='review-comment'>
                                {rep.content}
                              </div>

                              <div className='review-actions'>
                                <div className='upvote-section'>
                                  <button className='upvote-button' onClick={handleSetUpvote}>
                                    {upvote ? <img src={UpvoteFilled} alt="Upvote Filled" className='upvote' /> : <img src={Upvote} alt="Upvote" className='upvote' />}
                                  </button>
              
                                  <div className='upvote-number'>{rev.replies.length}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }))}
                      
                      
                    </div>
                  </div>
                <div className='review-subline'></div>
      
      
                </div>
              )
              
            })}
          
        </div>
      </div>

      <div className='left-sidebar'>
        <button className='bookmark-button' onClick={handleSetSaved}>
        {saved ? <img src={FilledBookmark} alt="Filled Bookmark" className='bookmark' /> : <img src={Bookmark} alt="Bookmark" className='bookmark' />}
        </button>
        <button className='chat-button' onClick={handleSetChatView}>

        <img src={ChatBubble} alt='Chat Bubble' className='chat' />
        </button>
        {
        showChat &&

        <Chatbot showChat={showChat} handleSetChatView={ handleSetChatView } />
        }
      </div>
    </div>
  );
};

export default RecipeView;