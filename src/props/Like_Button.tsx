// LikeButton.tsx
import React from 'react';

interface LikeButtonProps {
    isLiked: boolean;
    likes: number;
    onToggleLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, likes, onToggleLike }) => {
    return (
        <div className="flex items-center space-x-1">
            <button
                className="size-4 flex items-center justify-center"
                onClick={onToggleLike}
            >
                {isLiked ? (
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
                        <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#f00000"></path>
                    </svg>
                ) : (
                    <svg className="size-4" fill="#38b62f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#38b62f">
                        <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z"></path>
                    </svg>
                )}
            </button>
            <span>{likes} Likes</span>
        </div>
    );
};

export default LikeButton;
