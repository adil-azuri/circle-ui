import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import avatar from '@/assets/avatar.png'
import { ProfileUpdateDialog } from '../Right_Component/Update_Profile_Dialog';

export function User_profile() {
    const dispatch = useDispatch();
    const token = Cookies.get('token');
    const { account, isLoading, error } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (token) {
            const decoded: any = jwtDecode(token);
            const userId = decoded.id;
            dispatch<any>(fetchUser(userId));
        }
    }, [dispatch, token]);

    return (
        <div className=" max-w-2xl rounded-xl bg-zinc-800 border border-gray-700 shadow-xl py-1">
            <div className="relative">
                <div className="bg-gradient-to-r from-[#a3f7bf] via-[#fefcbf] to-[#f6d365] h-16 w-full rounded-t-xl" />
                <div className="absolute left-10 -bottom-8 z-10">
                    <div className="w-17 h-17 rounded-full overflow-hidden bg-gray-200 border-4 border-zinc-800 shadow-md">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">Loading...</div>
                        ) : (
                            <img
                                src={account && account.photo_profile ? `${account.photo_profile}` : avatar}
                                alt={account?.full_name || "User profile"}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-10 pb-3 px-6 text-white">
                <div className="flex flex-col gap-1">
                    <div className='flex justify-between items-center'>
                        <h3 className="font-semibold text-xl leading-tight">
                            {isLoading ? "Loading..." : account?.username ? `${account.full_name}` : "No User"}
                        </h3>
                        <ProfileUpdateDialog />
                    </div>
                    <span className="text-sm text-gray-400">@{account?.username}</span>
                    <span className="text-sm block min-h-[20px]">{account?.bio || "No Bio Yet!"}</span>
                    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
                </div>
                <div className="flex gap-4 mt-4 text-sm font-semibold text-white">
                    <div className="flex items-center space-x-1">
                        <span>{account?.following?.length || 0}</span>
                        <span className="text-gray-500 font-normal">Following</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span>{account?.followers?.length || 0}</span>
                        <span className="text-gray-500 font-normal">Followers</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
