import React from 'react';
import "../styles/stars.css";

const Stars = ({ rating, onRatingChange }) => {

  const handleRatingChange = (e) => {
    onRatingChange(parseInt(e.target.value, 10));
  };

  return (
    <div id="full-stars-example-two">
      <div className="rating-group">
        <input 
          disabled 
          defaultChecked={rating === 0} 
          className="rating__input rating__input--none" 
          name="rating3" 
          id="rating3-none" 
          value="0" 
          type="radio" 
        />
        {[1, 2, 3, 4, 5].map((star) => (
          <React.Fragment key={star}>
            <label 
              aria-label={`${star} star`} 
              className="rating__label" 
              htmlFor={`rating3-${star}`}>
              <i className={`rating__icon rating__icon--star fas fa-star${rating >= star ? ' filled' : ''}`}></i>
            </label>
            <input 
              className="rating__input" 
              name="rating3" 
              id={`rating3-${star}`} 
              value={star} 
              type="radio" 
              checked={rating === star} 
              onChange={handleRatingChange} 
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Stars;
