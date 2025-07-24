import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "@/assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/lib/time_converter";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Reply_Post } from "./Reply_post";
import LikeButton from "@/props/Like_Button";
import ReplyCount from "@/props/Reply_Count";

export function Select_Thread() {
    const [thread, setThread] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
    const baseUrl = `http://localhost:3000/uploads/`;
    const { id } = useParams();

    useEffect(() => {
        const fetchThreadDetail = async () => {
            setLoading(true);
            try {
                if (!id) return;
                const res = await api.get(`thread/${id}`);
                const threadData = (res.data as any)?.data?.thread;
                setThread(threadData);
            } catch (err) {
                console.error("Failed to fetch thread detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchThreadDetail();
    }, [id]);

    const toggleLike = () => {
        setThread((prevThread: any) => ({
            ...prevThread,
            isLiked: !prevThread.isLiked,
            likes: prevThread.isLiked ? prevThread.likes - 1 : prevThread.likes + 1
        }));
    };

    if (loading) {
        return <div className="text-white text-center py-4">Loading...</div>;
    }
    if (!thread) {
        return <div className="text-white text-center py-4">Thread not found.</div>;
    }

    return (
        <Card className="rounded-none border-none w-full">
            <CardContent>
                <div className="border-b border-gray-500">
                    <div className="flex items-center space-x-5 mb-5">
                        <Avatar className="size-8">
                            <AvatarImage src={thread.User?.photo_profile ? `${baseUrl}${thread.User.photo_profile}` : avatar} />
                        </Avatar>
                        <div className="w-full flex gap-3 items-center">
                            <p className="font-bold text-md">{thread.User?.full_name}</p>
                            <p className="text-md text-gray-400">@{thread.User?.username}</p>
                            <p className="text-xs text-gray-400">{timeAgo(thread.updated_at)}</p>
                        </div>
                    </div>
                    <p className="text-md font-sm">{thread.content}</p>
                    {thread.image && (
                        <img
                            src={`${baseUrl}${thread.image}`}
                            className="w-full max-h-50 object-contain rounded-xl my-3"
                            alt={thread.content || "Thread image"}
                        />
                    )}
                    <div className="flex gap-7 mb-3 cursor-pointer">
                        <LikeButton
                            isLiked={thread.isLiked}
                            likes={thread.likes}
                            onToggleLike={() => toggleLike()}
                        />
                        <div className="" onClick={() => setShowReplyForm(!showReplyForm)}>
                            <ReplyCount replyCount={Array.isArray(thread.replies) ? thread.replies.length : 0} />
                        </div>
                    </div>
                </div>
                {showReplyForm && <Reply_Post />}
            </CardContent>
        </Card>
    );
}
