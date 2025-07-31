import { api } from "@/api/api";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from 'react-redux';
import { ScrollArea } from "../ui/scroll-area";
import { FollowUnfollowButton } from "@/props/follow_unfollow_toggle";

interface User {
    id: number
    username: string;
    full_name: string;
    photo_profile: string | null;
}

export function Suggest_Follow() {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [recentlyFollowed, setRecentlyFollowed] = useState<number[]>([]);
    const baseUrl = `http://localhost:3000/uploads/`;
    const account = useSelector((state: any) => state.user.account);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get<{ all_user: User[] }>("/auth/all_user");
            let allUsers = res.data.all_user || [];
            if (account) {
                allUsers = allUsers.filter(u => u.id !== account.id);
                if (account.following && Array.isArray(account.following)) {
                    allUsers = allUsers.filter(u => !account.following.includes(u.id) || recentlyFollowed.includes(u.id));
                }
            }
            setUsers(allUsers);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [account, recentlyFollowed]);

    const handleFollow = useCallback((followId: number) => {
        setRecentlyFollowed(prev => [...prev, followId]);
        setTimeout(() => {
            setRecentlyFollowed(prev => prev.filter(id => id !== followId));
            setUsers(prevUsers => prevUsers.filter(user => user.id !== followId));
        }, 7000);
    }, []);

    const filteredUsers = users;

    return (
        <aside className="rounded-lg h-full">
            <div className="p-1">
                <h3 className="text-lg text-green-500 font-bold">Suggested for you</h3>
            </div>
            <ScrollArea className="max-h-65 scroll-smooth overflow-y-auto rounded-md bg-zinc-800 border border-gray-700 hide-scrollbar">
                <ul className="space-y-4 p-2 max-h-60 hide-scrollbar">
                    {loading ? (
                        <li className="text-gray-400 px-3 py-2">Loading suggestions...</li>
                    ) : filteredUsers.length === 0 ? (
                        <li className="text-gray-400 px-3 py-2">No suggestions available.</li>
                    ) : (
                        filteredUsers.map((user) => (
                            <li key={user.username} className="flex items-center justify-between bg-transparent hover:bg-gray-800 rounded-md transition-colors">
                                <div className="flex items-center">
                                    <div className="w-9 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                        {user.photo_profile ? (
                                            <img
                                                src={`${baseUrl}${user.photo_profile}`}
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
                                    onFollow={() => handleFollow(user.id)}
                                />
                            </li>
                        ))
                    )}
                </ul>
            </ScrollArea>
        </aside>
    );
}
