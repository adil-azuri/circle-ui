import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/library/time _converter";

interface User {
    id: number;
    username: string;
    full_name: string;
    profile_picture: string;
}

interface Thread {
    id: number;
    content: string;
    updateAt: string;
    user: User;
}



export function Thread_List() {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {threads.map(thread => (
                <div key={thread.id} className="mb-4 p-3 border-b border-gray-600">
                    <div className="flex items-center">
                        <img
                            src={avatar}
                            alt={thread.user.full_name}
                            className="size-8 object-cover rounded-full"
                        />
                        <p className="font-semibold ml-2">
                            {thread.user.full_name}
                            <span className="text-sm text-gray-400">
                                @{thread.user.username}
                            </span>
                        </p>
                        <p className="text-xs text-gray-400 ml-2">
                            {timeAgo(thread.updateAt)}
                        </p>
                    </div>
                    <p className="mt-2">{thread.content}</p>
                    <div className="flex justify-start gap-5 text-gray-400 mt-2">
                        <span>0 Replies</span>
                        <span>0 Likes</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
