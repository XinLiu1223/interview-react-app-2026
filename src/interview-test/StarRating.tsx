'use client';
import { useState } from 'react';

// Assume SVG icons are imported like this:
// import StarEmpty from './star-empty.svg';
// import StarFilled from './star-filled.svg';

// Placeholder SVGs for demonstration
// eslint-disable-next-line
const StarEmpty = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 17.27l-6.18 3.73l1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63l7.19.61l-5.46 4.73l1.64 7.03zM12 15.4l3.76 2.27l-1-4.28l3.32-2.88l-4.38-.38L12 6.1l-1.6 3.65l-4.38.38l3.32 2.88l-1 4.28l3.76-2.27z"
    />
  </svg>
);

// eslint-disable-next-line
const StarFilled = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 17.27l-6.18 3.73l1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63l7.19.61l-5.46 4.73l1.64 7.03z"
    />
  </svg>
);

const StarRating = ({
  maxStars = 5,
  initialRating = 0,
}: //   onRatingChange,
{
  maxStars: number;
  initialRating: number;

  //   onRatingChange: any;
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  // eslint-disable-next-line
  const handleClick = (index: any) => {
    setRating(index);
    // if (onRatingChange) {
    //   onRatingChange(index + 1);
    // }
  };

  // eslint-disable-next-line
  const handleMouseEnter = (index: any) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Revert to stored rating on mouse leave
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      const isFilled = (hoverRating || rating) >= i; // Hover rating takes priority
      stars.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer', display: 'inline-block' }}
        >
          {isFilled ? (
            <StarFilled style={{ color: 'gold' }} /> // Example filled star color
          ) : (
            <StarEmpty style={{ color: 'gray' }} /> // Example empty star color
          )}
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
