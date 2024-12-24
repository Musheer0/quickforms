"use client"
// StarRating.tsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';

// Define types for the props
interface StarRatingProps {
  id: string;
  name: string;
  onUpdate: (id: string, name: string, value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ id, name, onUpdate }) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (value: number) => {
    setRating(value);
    // Calling onUpdate to pass the updated rating
    onUpdate(id, name, value);
  };

  return (
    <div>
      <div className="star-rating flex gap-1 items-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            size={30}
            color={value <= rating ? '#FFD700' : '#d3d3d3'} // Gold if selected, gray if not
            onClick={() => handleStarClick(value)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      {/* Hidden input to store the rating */}
      <input type="hidden" name={name} value={rating} />
    </div>
  );
};

export default StarRating;
