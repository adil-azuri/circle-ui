import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "@/assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/lib/time_converter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Thread } from "@/types/threadsType";
import { useSnackBar } from '@/context/SnackBarContext';
import { useWebSocket } from "@/hooks/web_socket";
import LikeButton from '@/props/Like_Button';
import ReplyCount from '@/props/Reply_Count';

export function Thread_List() {
    const navigate = useNavigate();
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const baseUrl = `http://localhost:3000/uploads/`;
    const wsUrl = "ws://localhost:3000";
    const { showSnackbar } = useSnackBar();


    useEffect(() => {
        const fetchThreads = async () => {
            setLoading(true);
            try {
                const res = await api.get("auth/threads", { params: { limit: 99 } });
                const threadsData = (res.data as any)?.data?.threads;
                setThreads(threadsData || []);
            } catch (err) {
                console.error("Failed to fetch threads:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchThreads();
    }, []);

    const handleWebSocketMessage = (message: any) => {
        if (message.type === 'new_thread') {
            const updatedThread: Thread = message.payload;
            setThreads(prevThreads => {
                const existingThreadIndex = prevThreads.findIndex(thread => thread.id === updatedThread.id);
                let newThreadsList;
                if (existingThreadIndex !== -1) {
                    newThreadsList = [...prevThreads];
                    newThreadsList[existingThreadIndex] = updatedThread;
                } else {
                    newThreadsList = [updatedThread, ...prevThreads];
                }
                return newThreadsList.sort((a, b) => new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime());
            });
            showSnackbar(`${updatedThread.user.full_name} uploaded a new thread`);
        } else {
            console.log("Received unknown WebSocket message type:", message.type);
        }
    };

    useWebSocket(wsUrl, handleWebSocketMessage);

    if (loading) {
        return <div className="text-white text-center py-4">Loading...</div>;
    }

    return (
        <aside className="h-full w-full overflow-hidden">
            <ScrollArea className="h-full overflow-y-auto">
                {threads.length === 0 && !loading ? (
                    <p className="text-white text-center mt-8">No threads to display.</p>
                ) : (
                    threads.map(thread => (
                        <div key={thread.id} className="border-b border-gray-600 px-4">
                            <div className="flex my-5 space-x-3 ">
                                <Avatar>
                                    <AvatarImage className="object-cover"
                                        src={thread.user.profile_picture ? `${baseUrl}${thread.user.profile_picture}` : avatar} />
                                </Avatar>
                                <div className="w-full cursor-pointer">
                                    <div className="cursor-pointer"
                                        onClick={() => navigate(`threads/${thread.id}`)}>
                                        <div className="flex items-center space-x-2" >
                                            <p className="font-semibold text-white">{thread.user.full_name}</p>
                                            <p className="text-sm text-gray-400">@{thread.user.username}</p>
                                            <p className="text-xs text-gray-400">{timeAgo(thread.updateAt)}</p>
                                        </div>
                                        <p className="mt-2 text-white">{thread.content}</p>
                                        {thread.image && (
                                            <div className="">
                                                <img
                                                    src={`${baseUrl}${thread.image}`}
                                                    className="w-full max-h-80 object-contain rounded-xl mt-3"
                                                    alt={thread.content || "Thread image"}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-start gap-10 text-gray-400 mt-2">
                                        <LikeButton
                                            threadId={thread.id}
                                            likes={thread.likes}
                                            setLikes={(newLikes) => {
                                                setThreads(prevThreads =>
                                                    prevThreads.map(t =>
                                                        t.id === thread.id ? { ...t, likes: newLikes } : t
                                                    )
                                                );
                                            }}
                                        />
                                        <ReplyCount replyCount={thread.reply} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </ScrollArea>
        </aside>
    );
}
