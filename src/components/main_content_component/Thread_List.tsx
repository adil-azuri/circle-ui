import React, { useEffect, useState, useRef } from "react";
import avatar from "../../assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/lib/time_converter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Thread } from "@/types/threadsType";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Thread_List({ onThreadClick }: any) {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const baseUrl = `http://localhost:3000/uploads/`;
    const wsUrl = "ws://localhost:3000";

    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const fetchThreads = async () => {
            setLoading(true);
            try {
                const res = await api.get("auth/threads",
                    { params: { limit: 25 } });
                const threadsData = (res.data as any)?.data?.threads;
                setThreads(threadsData);


            } catch (err) {
                console.error("Failed to fetch threads:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchThreads();

        if (!socketRef.current) {
            const newSocket = new WebSocket(wsUrl);

            newSocket.onopen = () => {
                console.log("WebSocket connection established");
            };

            newSocket.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data.toString());

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

                        setSnackbarMessage(`${updatedThread.user.full_name} uploaded a new thread`);
                        setSnackbarOpen(true);
                    } else {
                        console.log("Received unknown WebSocket message type:", message.type);
                    }
                } catch (error) {
                    console.error("Failed to parse WebSocket message or unknown format:", error, event.data);
                }
            };

            newSocket.onclose = () => {
                console.log("WebSocket connection closed");
            };

            newSocket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            socketRef.current = newSocket;
        }

        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
            socketRef.current = null;
        };
    }, []);

    const toggleLike = (threadId: number) => {
        setThreads(prevThreads =>
            prevThreads.map(thread =>
                thread.id === threadId ? { ...thread, isLiked: !thread.isLiked } : thread
            )
        );
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return <div className="text-white text-center py-4">Loading...</div>;
    }

    return (
        <aside className="h-screen overflow-hidden">
            <ScrollArea className="h-full">
                {threads.length === 0 && !loading ? (
                    <p className="text-white text-center mt-8">No threads to display.</p>
                ) : (
                    threads.map(thread => (
                        <div key={thread.id} className="border-b border-gray-600" >
                            <div className="flex my-5 space-x-3 ">
                                <Avatar>
                                    <AvatarImage src={thread.user.profile_picture ? `${baseUrl}${thread.user.profile_picture}` : avatar} />
                                </Avatar>
                                <div className="w-full" >
                                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onThreadClick(thread.id as number)}>
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
                                    <div className="flex justify-start gap-10 text-gray-400 mt-2">
                                        <div className="flex items-center space-x-1">
                                            <button
                                                className="size-4 flex items-center justify-center"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLike(thread.id);
                                                }}
                                            >
                                                {thread.isLiked ? (
                                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
                                                        <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#f00000"></path>
                                                    </svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                )}
                                            </button>
                                            <span>{thread.likes} Likes</span>
                                        </div>
                                        <div className="flex items-center gap-1">

                                            <span>{thread.reply} Replies</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </ScrollArea>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}

            >
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </aside>
    );
}
