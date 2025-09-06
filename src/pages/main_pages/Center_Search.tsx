import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { api } from '@/api/api';
import { FaSearch } from 'react-icons/fa';
import { FollowUnfollowButton } from '@/props/follow_unfollow_toggle';

function debounce<F extends (...input: any[]) => void>(func: F, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...input: Parameters<F>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...input), delay);
    };
}

interface search {
    id: number;
    username: string;
    full_name: string;
    photo_profile: string | null;
}

export function Center_Search() {
    const [query, setQuery] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<search[]>([]);
    const account = useSelector((state: any) => state.user.account);

    const fetchItems = useCallback(async (searchQuery: string) => {
        if (searchQuery.length > 0) {
            try {
                const response = await api.get<{ search?: search[] }>(`/auth/search?query=${encodeURIComponent(searchQuery)}`);
                let searchItems = response.data?.search || [];
                if (account) {
                    searchItems = searchItems.filter(curentUser => curentUser.id !== account.id);
                }
                setFilteredItems(searchItems);
            } catch (error) {
                console.error("Error fetching items:", error);
                setFilteredItems([]);
            }
        } else {
            setFilteredItems([]);
        }
    }, [account]);

    const debouncedFetchItems = useMemo(() => debounce(fetchItems, 700), [fetchItems]);

    useEffect(() => {
        debouncedFetchItems(query);
    }, [query, debouncedFetchItems]);

    return (
        <div className="flex flex-col h-full w-full p-4 mx-auto">
            <h1 className="text-2xl font-bold text-green-400 font-sans mb-3">Search User</h1>
            <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 text-lg">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 rounded-full bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-zinc-700"
                />
            </div>
            <ul className="mt-4 bg-zinc-900 rounded-xl shadow-lg divide-y divide-zinc-800">
                {filteredItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition-colors">
                        <div className="flex items-center gap-3">
                            {item.photo_profile ? (
                                <img
                                    src={`${item.photo_profile}`}
                                    alt={item.full_name}
                                    className="w-10 h-10 rounded-full object-cover bg-zinc-700"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold text-lg uppercase">
                                    {item.full_name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <div className="font-semibold text-white leading-tight">{item.full_name}</div>
                                <div className="text-sm text-gray-400">@{item.username}</div>
                            </div>
                        </div>
                        <FollowUnfollowButton
                            followId={item.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
