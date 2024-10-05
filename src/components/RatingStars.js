// src/components/RatingStars.js
import React from "react";

const RatingStars = ({ rating }) => {
  // Calculate number of full stars, half star, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  const starIcons = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(
      <img
        key={`star-full-${i}`}
        src="/static/images/icons/star.png"
        alt="full star"
      />
    );
  }

  // Add half star if applicable
  if (hasHalfStar) {
    starIcons.push(
      <img
        key="star-half"
        src="/static/images/icons/half-star.png"
        alt="half star"
      />
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(
      <img
        key={`star-empty-${i}`}
        src="/static/images/icons/empty-star.png"
        alt="empty star"
      />
    );
  }

  return <div className="rating-stars">{starIcons}</div>;
};

export default RatingStars;
