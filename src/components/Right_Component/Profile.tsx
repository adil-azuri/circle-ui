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
        <div className="rounded-xl mb-5 bg-zinc-800 border border-gray-700 shadow-xl w-full max-w-sm">
            <div className="bg-gradient-to-r from-[#a3f7bf] via-[#fefcbf] to-[#f6d365] h-[96px] w-full rounded-t-xl overflow-hidden">
                <div className=" bg-gradient-to-r from-[#a3f7bf] via-[#fefcbf] to-[#f6d365]" />

                <div className='absolute top-15 right-67'>
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-[#1a1a1a] shadow-md">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-full text-xs text-gray-500">
                                Loading...
                            </div>
                        ) : (
                            <div>

                                <img
                                    src={account && account.photo_profile ? `${baseUrl}${account.photo_profile}` : avatar}
                                    alt={account?.full_name || "User profile"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-5 pb-4 px-4 text-white">
                <div >
                    <div className='pt-5 flex justify-between'>
                        <h3 className="font-semibold text-lg">
                            {isLoading ? "Loading..." : account?.username ? `✨ ${account.full_name} ✨` : "No User"}
                        </h3>
                        <ProfileUpdateDialog />
                    </div>
                    <p className="text-sm text-gray-400">@{account?.username}</p>
                    <p className="text-sm mt-2">
                        {account?.bio || "No Bio Yet!"}
                    </p>
                    {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
                </div>

                <div className="px-5 flex gap-6 mt-4 text-sm font-semibold text-white">
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
