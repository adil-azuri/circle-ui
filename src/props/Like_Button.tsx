import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from "@/api/api";
import love from '@/assets/love.svg'
import unlove from '@/assets/unlove.svg'
import { addLikedThread, removeLikedThread } from '@/store/slices/userSlice';
import { useWebSocket } from "@/hooks/web_socket";
import { useSnackBar } from '@/context/SnackBarContext';

interface LikeButtonProps {
    threadId: number;
    likes: number;
    setLikes: (likes: number) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ threadId, likes, setLikes }) => {
    const dispatch = useDispatch();
    const { account } = useSelector((state: any) => state.user);
    const initialIsLiked = account?.likedThreads?.includes(threadId) ?? false;
    const [isLiked, setIsLiked] = React.useState(initialIsLiked);
    const wsUrl = "ws://localhost:3000";
    const { showSnackbar } = useSnackBar();

    React.useEffect(() => {
        setIsLiked(account?.likedThreads?.includes(threadId) ?? false);
    }, [account, threadId]);

    const handleWebSocketMessage = (message: any) => {
        if (message.type === 'new_like') {
            const updatedLike: any = message.payload;
            if (updatedLike.thread_id === threadId) {
                showSnackbar(`${updatedLike.user_full_name || 'Someone'} liked thread!`);
            }
        }
    };

    useWebSocket(wsUrl, handleWebSocketMessage);

    const handleToggleLike = async () => {
        const newIsLiked = !isLiked;
        const newLikesCount = newIsLiked ? likes + 1 : likes - 1;
        setIsLiked(newIsLiked);
        setLikes(newLikesCount);

        try {
            if (newIsLiked) {
                await api.post(`/thread/like`, { thread_id: threadId });
                dispatch(addLikedThread(threadId));
            } else {
                await api.post(`/thread/unlike`, { thread_id: threadId });
                dispatch(removeLikedThread(threadId));
            }
        } catch (error: any) {
            setIsLiked(!newIsLiked);
            setLikes(likes);
            if (error.response && error.response.status === 409) {

            } else {
                console.error("Failed to update like status:", error);
            }
        }
    };

    return (
        <div className="flex items-center space-x-1">
            <button
                className={`size-6 flex items-center justify-center rounded-full transition-colors duration-200 ${isLiked ? ' border-red-400' : ' border-gray-300'}`}
                onClick={handleToggleLike}
                aria-pressed={isLiked}
                aria-label={isLiked ? 'Unlike' : 'Like'}
            >
                <img src={isLiked ? love : unlove} alt={isLiked ? 'liked' : 'unliked'} className="size-4" />
            </button>
            <span className=" text-md ">{likes} Likes</span>
        </div>
    );
};

export default LikeButton;
