import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '@/store/slices/userSlice';
import { useSnackBar } from '@/context/SnackBarContext';


interface FollowUnfollowButtonProps {
    followId: number; // ID of the user to follow/unfollow
    onFollow?: () => void; // Optional callback after successful follow
}


export const FollowUnfollowButton: React.FC<FollowUnfollowButtonProps> = ({ followId, onFollow }) => {
    const dispatch = useDispatch();
    const account = useSelector((state: any) => state.user.account);
    const { showSnackbar } = useSnackBar();
    const isFollowing = !!account && Array.isArray(account.following) && account.following.includes(followId);

    const handleToggleFollow = async () => {
        try {
            if (!isFollowing) {
                await dispatch(followUser({ follow_id: followId }) as any);
                showSnackbar("You are now following a user!");
                if (onFollow) {
                    onFollow();
                }
            } else {
                await dispatch(unfollowUser({ unfollow_id: followId }) as any);
                showSnackbar("You have unfollowed a user.");
            }
        } catch (error: any) {
            console.error("Failed to update follow status:", error);
        }
    };

    return (
        <button
            className={`rounded-full px-4 py-1 text-xs font-medium transition-colors duration-150 ${isFollowing ? 'bg-gray-700 text-gray-300 border border-gray-500 cursor-pointer' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            onClick={handleToggleFollow}
            aria-pressed={isFollowing}
            aria-label={isFollowing ? 'Unfollow' : 'Follow'}
        >
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
};
