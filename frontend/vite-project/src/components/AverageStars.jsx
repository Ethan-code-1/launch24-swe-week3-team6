// src/components/AverageStars.jsx
import React from 'react';
import '../styles/average-stars.css';

const AverageStars = ({ rating }) => {
  // Create an array of stars based on the rating
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="average-stars">
      {[...Array(fullStars)].map((_, index) => (
        <i key={index} className="fa fa-star star"></i>
      ))}
      {halfStar && <i className="fa fa-star-half-alt star"></i>}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={index} className="fa fa-star star empty"></i>
      ))}
    </div>
  );
};

export default AverageStars;
