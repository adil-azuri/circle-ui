import { useEffect, useState } from "react";
import avatar from "@/assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/lib/time_converter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function ThreadDetail({ threadId }: { threadId: number }) {
    const [thread, setThread] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const baseUrl = `http://localhost:3000/uploads/`;

    useEffect(() => {
        const fetchThreadDetail = async () => {
            setLoading(true);
            try {
                const res = await api.get(`thread/${threadId}`);
                const threadData = (res.data as any)?.data?.thread;
                setThread(threadData);
            } catch (err) {
                console.error("Failed to fetch thread detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchThreadDetail();
    }, [threadId]);

    if (loading) {
        return <div className="text-white text-center py-4">Loading...</div>;
    }
    if (!thread) {
        return <div className="text-white text-center py-4">Thread not found.</div>;
    }

    return (
        <div className="p-4 border-b  text-white mb-2">

            <div className="flex items-center space-x-3">
                <Avatar>
                    <AvatarImage src={thread.User.photo_profile ? `${baseUrl}${thread.User.photo_profile}` : avatar} />
                </Avatar>
                <div>
                    <p className="font-semibold">{thread.User.full_name}</p>
                    <p className="text-sm text-gray-400">@{thread.User.username}</p>
                    <p className="text-xs text-gray-400">{timeAgo(thread.updated_at)}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold mt-4">{thread.content}</h2>
            {thread.image && (
                <img
                    src={`${baseUrl}${thread.image}`}
                    className="w-full max-h-50 object-contain rounded-xl mt-3"
                    alt={thread.content || "Thread image"}
                />
            )}
            <div className="mt-4">
                <span className="text-gray-400">{Array.isArray(thread.likes) ? thread.likes.length : 0} Likes</span>
                <span className="text-gray-400 ml-4">{Array.isArray(thread.replies) ? thread.replies.length : 0} Replies</span>
            </div>
            {Array.isArray(thread.replies) && thread.replies.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-md font-bold mb-2">Replies</h3>
                    {thread.replies.map((reply: any) => (
                        <div key={reply.id} className="mb-2 p-2 bg-zinc-800 rounded">
                            <p className="text-sm text-gray-300">{reply.content}</p>
                            <p className="text-xs text-gray-500">{timeAgo(reply.updated_at)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
