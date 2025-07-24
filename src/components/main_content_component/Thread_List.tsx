import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import avatar from '@/assets/avatar.png';
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

export function Thread_List() {
    const navigate = useNavigate();
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
        <aside className="h-screen overflow-hidden w-full bg">
            <ScrollArea className="h-full">
                {threads.length === 0 && !loading ? (
                    <p className="text-white text-center mt-8">No threads to display.</p>
                ) : (
                    threads.map(thread => (
                        <div key={thread.id} className="border-b border-gray-600 px-4">
                            <div className="flex my-5 space-x-3 ">
                                <Avatar>
                                    <AvatarImage src={thread.user.profile_picture ? `${baseUrl}${thread.user.profile_picture}` : avatar} />
                                </Avatar>
                                <div
                                    className="w-full cursor-pointer"
                                    onClick={() => navigate(`threads/${thread.id}`)}
                                >
                                    <div className="flex items-center space-x-2">
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
                                                    <svg className="size-4"
                                                        fill="#38b62f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#38b62f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z"></path></g></svg>
                                                )}
                                            </button>
                                            <span>{thread.likes} Likes</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="size-4"
                                                viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#a3be41" stroke="#a3be41"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment-3</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" > <g id="Icon-Set" transform="translate(-204.000000, -255.000000)" fill="#74aa22"> <path d="M228,267 C226.896,267 226,267.896 226,269 C226,270.104 226.896,271 228,271 C229.104,271 230,270.104 230,269 C230,267.896 229.104,267 228,267 L228,267 Z M220,281 C218.832,281 217.704,280.864 216.62,280.633 L211.912,283.463 L211.975,278.824 C208.366,276.654 206,273.066 206,269 C206,262.373 212.268,257 220,257 C227.732,257 234,262.373 234,269 C234,275.628 227.732,281 220,281 L220,281 Z M220,255 C211.164,255 204,261.269 204,269 C204,273.419 206.345,277.354 210,279.919 L210,287 L217.009,282.747 C217.979,282.907 218.977,283 220,283 C228.836,283 236,276.732 236,269 C236,261.269 228.836,255 220,255 L220,255 Z M212,267 C210.896,267 210,267.896 210,269 C210,270.104 210.896,271 212,271 C213.104,271 214,270.104 214,269 C214,267.896 213.104,267 212,267 L212,267 Z M220,267 C218.896,267 218,267.896 218,269 C218,270.104 218.896,271 220,271 C221.104,271 222,270.104 222,269 C222,267.896 221.104,267 220,267 L220,267 Z" id="comment-3"> </path> </g> </g> </g>
                                            </svg>
                                            <span>{thread.reply}  Replies</span>
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
