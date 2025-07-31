import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import avatar from '@/assets/avatar.png'
import { ProfileUpdateDialog } from './Update_Profile_Dialog';

export function Profile() {
    const dispatch = useDispatch();
    const token = Cookies.get('token');
    const baseUrl = `http://localhost:3000/uploads/`;
    const { account, isLoading, error } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (token) {
            const decoded: any = jwtDecode(token);
            const userId = decoded.id;
            dispatch<any>(fetchUser(userId));
        }
    }, [dispatch, token]);

    return (
        <div className=" max-w-full rounded-xl bg-zinc-800 border border-gray-700 shadow-xl">
            <div className="relative">
                <div className="bg-gradient-to-r from-[#a3f7bf] via-[#fefcbf] to-[#f6d365] h-24 w-full rounded-t-xl" />
                <div className="absolute left-4 -bottom-10 z-10">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-4 border-zinc-800 shadow-md">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-full text-xs text-gray-500">Loading...</div>
                        ) : (
                            <img
                                src={account && account.photo_profile ? `${baseUrl}${account.photo_profile}` : avatar}
                                alt={account?.full_name || "User profile"}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-12 pb-4 px-5 text-white">
                <div className="flex flex-col gap-1">
                    <div className='flex justify-between'>
                        <h3 className="font-semibold text-lg leading-tight">
                            {isLoading ? "Loading..." : account?.username ? `✨ ${account.full_name} ✨` : "No User"}
                        </h3>
                        <ProfileUpdateDialog />
                    </div>
                    <span className="text-sm text-gray-400">@{account?.username}</span>
                    <span className="text-sm mt-1 block min-h-[20px]">{account?.bio || "No Bio Yet!"}</span>
                    {error && <span className="text-xs text-red-400 mt-2">{error}</span>}
                </div>
                <div className="flex gap-6 mt-4 text-sm font-semibold text-white">
                    <div className="flex items-center space-x-1">
                        <span>{account?.following?.length || 0}</span>
                        <span className="text-gray-500 font-normal">Following</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span>{account?.Follower?.length || 0}</span>
                        <span className="text-gray-500 font-normal">Followers</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
