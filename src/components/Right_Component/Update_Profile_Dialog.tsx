import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import avatar from "@/assets/avatar.png";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, } from "../ui/dialog";
import { updateUserProfile, fetchUser } from '@/store/slices/userSlice';
import Swal from 'sweetalert2';

export function ProfileUpdateDialog() {
    const { account } = useSelector((state: any) => state.user);
    const [username, setUsername] = useState(account?.username || "");
    const [full_name, setFullName] = useState(account?.full_name || "");
    const [bio, setBio] = useState(account?.bio || "");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isDialogOpen && account) {
            setUsername(account.username || "");
            setFullName(account.full_name || "");
            setBio(account.bio || "");
            setPhotoPreview(account.photo_profile ? `http://localhost:3000/uploads/${account.photo_profile}` : null);
            setPhoto(null);
        }
    }, [isDialogOpen, account]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDialogOpen(false);
        const result = await Swal.fire({
            title: 'Update Profile',
            text: 'Apakah Anda yakin ingin mengupdate profil?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, update',
            cancelButtonText: 'Batal',
        });
        if (!result.isConfirmed) return;
        setIsLoading(true);
        setErrorMsg("");

        const formData = new FormData();
        if (username) formData.append("username", username);
        if (full_name) formData.append("full_name", full_name);
        if (bio) formData.append("bio", bio);
        if (photo) formData.append("photo_profile", photo);

        try {
            await dispatch(updateUserProfile(formData) as any).unwrap();
            if (account?.id) {
                await dispatch(fetchUser(account.id) as any);
            }
            setIsDialogOpen(false);
            Swal.fire({
                title: 'Berhasil!',
                text: 'Profil berhasil diupdate.',
                icon: 'success',
                confirmButtonColor: '#22c55e',
            });
        } catch (error: any) {
            setErrorMsg(error.message || "Failed to update profile");
            Swal.fire({
                title: 'Gagal!',
                text: error.message || 'Failed to update profile',
                icon: 'error',
                confirmButtonColor: '#d33',
            });
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedPhoto = e.target.files[0];
            setPhoto(selectedPhoto);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedPhoto);
        } else {
            setPhoto(null);
            setPhotoPreview(account?.photo_profile ? `http://localhost:3000/uploads/${account.photo_profile}` : null);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="border hover:bg-gray-700 cursor-pointer transition-colors text-sm text-white px-3 py-1 rounded-full">
                    Edit Profile
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-zinc-900 text-white border-none shadow-lg shadow-gray-800 p-0">
                <div className="rounded-t-xl bg-gradient-to-r from-[#a3f7bf] via-[#fefcbf] to-[#f6d365] h-28 w-full relative flex flex-col items-center justify-end">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-[#1a1a1a] shadow-md flex items-center justify-center">
                            <img
                                src={photoPreview || avatar}
                                alt={full_name || "User profile"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-500 text-white rounded-full p-1 cursor-pointer border-2 border-white" style={{ transform: 'translate(30%, 30%)' }}>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                            <span className="text-xs">✏️</span>
                        </label>
                    </div>
                </div>
                <div className="pt-16 pb-4 px-6">
                    <DialogTitle className="text-xl font-bold text-white mb-4 text-center">
                        Edit profile
                    </DialogTitle>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full text-white bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full text-white bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Bio</label>
                            <textarea
                                placeholder="Bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full text-white bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            />
                        </div>
                        {errorMsg && (
                            <p className="text-red-500 text-sm text-center mt-2">{errorMsg}</p>
                        )}
                        <button
                            type="submit"
                            className={`bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-500 transition-colors duration-200 font-semibold mt-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
