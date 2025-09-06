import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import avatar from '@/assets/avatar.png';
import { timeAgo } from '@/lib/time_converter';

export function MyThread() {
    const threads = useSelector((state: any) => state.user.account?.threads || []);
    const user = useSelector((state: any) => state.user.account);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [threadList, setThreadList] = useState(threads);
    threadList

    useEffect(() => {
        console.log('MyProfilePosts threads:', threads);
        setThreadList(threads);
    }, [threads]);

    if (!threads.length) {
        return <div className="text-gray-400 p-4">No posts available.</div>;
    }

    return (
        <aside className="w-full transition-all">
            <div
                ref={scrollRef}
                className="h-[calc(100vh-350px)] overflow-y-auto bg-transparent w-full hide-scrollbar"
            >
                <ScrollArea className="bg-transparent">
                    {threads.map((thread: any) => (
                        <div key={thread.id} className="border-b border-gray-600 px-4 py-5">
                            <div className="flex space-x-3">
                                <Avatar>
                                    <AvatarImage
                                        className="object-contain scale-75"
                                        src={user?.photo_profile || avatar}
                                    />
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <p className="font-semibold text-white">{user?.full_name || 'Unknown'}</p>
                                        <p className="text-sm text-gray-400">@{user?.username || 'unknown'}</p>
                                        <p className="text-xs text-gray-400">{timeAgo(thread.created_at)}</p>
                                    </div>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => navigate(`/home/threads/${thread.id}`)}
                                    >
                                        <p className="text-white mt-1 whitespace-pre-wrap break-words">{thread.content}</p>
                                        {thread.image && (
                                            <img
                                                src={thread.image}
                                                alt="Post media"
                                                className="mt-2 max-h-70 w-70 rounded"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </ScrollArea>

                <div>
                    <p className="text-center text-gray-400 py-4">End of content</p>
                </div>
            </div>
        </aside>
    );
}
