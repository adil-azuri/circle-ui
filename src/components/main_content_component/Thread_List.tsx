import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/lib/time_converter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Thread } from "@/types/threadsType";


export function Thread_List() {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const baseUrl = `http://localhost:3000/uploads/`;

    useEffect(() => {
        const fetchThreads = async () => {
            setLoading(true);
            try {
                const res = await api.get("auth/threads", {
                    params: { limit: 25 },
                });
                const threads = (res.data as any)?.data?.threads;

                if (Array.isArray(threads)) {
                    setThreads(threads);
                }
            } catch (err) {
                console.error("Failed to fetch threads", err);
            } finally {
                setLoading(false);
            }
        };
        fetchThreads();
    }, []);

    const toggleLike = (threadId: number) => {
        setThreads(prevThreads =>
            prevThreads.map(thread =>
                thread.id === threadId ? { ...thread, isLiked: !thread.isLiked } : thread
            )
        );
    };

    if (loading) {
        return <div className="text-white text-center py-4">Loading...</div>;
    }

    return (
        <aside className="h-screen overflow-hidden">
            <ScrollArea className="h-full">
                {threads.map(thread => (
                    <div key={thread.id} className="border-b border-gray-600">
                        <div className="flex my-5 space-x-3">
                            <div>
                                <Avatar>
                                    <AvatarImage src={thread.user.profile_picture || avatar} />
                                </Avatar>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <p className="font-semibold text-white">{thread.user.full_name}</p>
                                    <p className="text-sm text-gray-400">@{thread.user.username}</p>
                                    <p className="text-xs text-gray-400">{timeAgo(thread.updateAt)}</p>
                                </div>
                                <p className="mt-2 text-white">{thread.content}</p>

                                {thread.image && (
                                    <div className="mt-3">
                                        <img
                                            src={`${baseUrl}${thread.image}`}
                                            className="w-full max-h-80 object-contain rounded-xl"
                                            alt={thread.content || "Thread image"}
                                        />
                                    </div>
                                )}

                                <div className="flex justify-start gap-10 text-gray-400 mt-2">
                                    <div className="flex items-center space-x-1"> {/* Perbaiki layout agar icon dan teks sejajar */}
                                        <button
                                            className="size-4 flex items-center justify-center" // Tambahkan flex untuk positioning icon
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
                                        <svg
                                            className="size-4" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <title>comment-2</title>
                                                <desc>Created with Sketch Beta.</desc>
                                                <defs> </defs>
                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="Icon-Set" transform="translate(-152.000000, -255.000000)" fill="#c2c2c2">
                                                        <path d="M168,281 C166.832,281 165.704,280.864 164.62,280.633 L159.912,283.463 L159.975,278.824 C156.366,276.654 154,273.066 154,269 C154,262.373 160.268,257 168,257 C175.732,257 182,262.373 182,269 C182,275.628 175.732,281 168,281 L168,281 Z M168,255 C159.164,255 152,261.269 152,269 C152,273.419 154.345,277.354 158,279.919 L158,287 L165.009,282.747 C165.979,282.907 166.977,283 168,283 C176.836,283 184,276.732 184,269 C184,261.269 176.836,255 168,255 L168,255 Z M175,266 L161,266 C160.448,266 160,266.448 160,267 C160,267.553 160.448,268 161,268 L175,268 C175.552,268 176,267.553 176,267 C176,266.448 175.552,266 175,266 L175,266 Z M173,272 L163,272 C162.448,272 162,272.447 162,273 C162,273.553 162.448,274 163,274 L173,274 C173.552,274 174,273.553 174,273 C174,272.447 173.552,272 173,272 L173,272 Z" id="comment-2"> </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <span>{thread.reply} Replies</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </aside>
    );
}