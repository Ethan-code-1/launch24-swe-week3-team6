import {useState, useEffect} from 'react';
import RecipeImage from '../assets/recipe-image.jpeg'
import '../styles/recipe-view.css'
import Bookmark from '../icons/bookmark.png'
import FilledBookmark from '../icons/bookmark-filled.png'
import ChatBubble from '../icons/chat-bubble.png'


const RecipeView = () => {
  const [saved, setSaved] = useState(false);

  const handleSetSaved = () => { 
    setSaved(!saved);
  }

  return (
    <div className='recipe-view-page'>
      <div className='body'>
        <div className='top-section'>
          <div className='page-title'>Title</div>
          <div className='overview-container'>
              <div className='page-subtitle'>***** 3.9 from 2 votes | </div>
              <div className='page-subtitle'> 12 comments</div>
          </div>

          <img src={RecipeImage} alt='Recipe Image' className='recipe-image'/>
          <div> IMAGE DESCRIPTION </div>
        </div>

        <div className='middle-section'>
          <div className='recipe-container'>
            <div className='recipe-title'>Title</div>
            <div className='recipe-subtitle'> Ingredients</div>
            <div className='recipe-line'></div>
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ul>
          
          </div>
          
        </div>
        

        <div className='bottom-section'>
          <div className='rating-title'>3 Reviews</div>
          <div className='stars'>*****</div>
          
        </div>

      </div>
      
      <div className='left-sidebar'>
        <button className='bookmark-button'  onClick={handleSetSaved}
        > 
          {saved &&  <img src={FilledBookmark} alt="Filled Bookmark" className='bookmark'/> }
          {!saved &&  <img src={Bookmark} alt="Bookmark" className='bookmark'/> }
        </button>

        <button className='chat-button'>
          <img src={ ChatBubble } alt='Chat Bubble' className='chat' />
        </button>
      </div>
    </div>
    
  );
};

export default RecipeView;
