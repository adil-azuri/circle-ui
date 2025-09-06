
import { api } from "@/api/api";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { FollowUnfollowButton } from '@/props/follow_unfollow_toggle';

interface User {
    id: number
    username: string;
    full_name: string;
    photo_profile: string | null;
}

export function Follower() {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);

    const fetchFollowers = async () => {
        setLoading(true);
        try {
            const res = await api.get<{ data: { followers: User[] } }>("/follow/follower");
            setUsers(res.data.data.followers || []);
        } catch (error) {
            console.error("Failed to fetch followers:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFollowers();
    }, []);

    return (
        <aside className="rounded-lg h-full">
            <div className="mx-5 p-1"></div>
            <ScrollArea className="h-full overflow-y-auto">
                <ul className="space-y-6 p-2 overflow-y-auto">
                    {loading ? (
                        <li className="text-gray-400 px-3 py-2">Loading Followers...</li>
                    ) : users.length === 0 ? (
                        <li className="text-gray-400 px-3 py-2">No Followers yet.</li>
                    ) : (
                        users.map((user) => {

                            return (
                                <li key={user.username} className="flex items-center justify-between bg-transparent hover:bg-gray-800 rounded-md transition-colors">
                                    <div className="flex items-center">
                                        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                            {user.photo_profile ? (
                                                <img
                                                    src={`${user.photo_profile}`}
                                                    alt={`${user.full_name}'s profile`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-bold text-lg">{user.full_name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <div className="font-semibold text-gray-300 leading-tight">{user.full_name}</div>
                                            <div className="text-xs text-gray-500">@{user.username}</div>
                                        </div>
                                    </div>
                                    <FollowUnfollowButton
                                        followId={user.id}
                                    />
                                </li>
                            );
                        })
                    )}
                </ul>
            </ScrollArea>
        </aside>
    );
}
