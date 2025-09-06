import { useState } from "react";
import avatar from "@/assets/avatar.png"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { handleThread } from "@/hooks/handleThread";
import { useSelector } from "react-redux";

export function Thread_Post() {
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const userPhoto = useSelector((state: any) => state.user.account?.photo_profile);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleThread(
            content,
            photo,
            setContent,
            setPhoto,
            setPhotoPreview,
            setErrorMsg,
            setIsLoading
        );
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
            setPhotoPreview(null);
        }
    };

    return (
        <div className="p-3 flex mb-4 border-b border-gray-600 gap-5">
            <Avatar>
                <AvatarImage src={userPhoto ? userPhoto : avatar} />
            </Avatar>
            <form onSubmit={onSubmit} className="flex w-full space-y-3 space-x-3">
                <div className="w-full">
                    <div className="flex w-full items-center justify-between gap-3 space-y-3">
                        <textarea
                            id="content"
                            rows={1}
                            placeholder="What is happening?!"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-green-500 text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                            required
                            disabled={isLoading}
                        />

                        <label className="flex items-center cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                                disabled={isLoading}
                            />
                            <svg className={`size-6 ${isLoading ? 'text-gray-500 cursor-not-allowed' : 'text-green-500'}`} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <g fill="none" fillRule="evenodd">
                                    <path d="m0 0h32v32h-32z"></path>
                                    <path d="m24 2c4.418278 0 8 3.581722 8 8v12c0 4.418278-3.581722 8-8 8h-16c-4.418278 0-8-3.581722-8-8v-12c0-4.418278 3.581722-8 8-8zm-15.15704017 11.3933983-6.84295983 6.8426017v1.764c0 3.2383969 2.56557489 5.8775718 5.77506174 5.9958615l.22493826.0041385h15.45zm21.15704017-1.8643983-10.096 10.097 6.048224 6.0492469c2.2878684-.7868384 3.9503124-2.9181728 4.0436375-5.4503086l.0041385-.2249383zm-6-7.529h-16c-3.23839694 0-5.87757176 2.56557489-5.99586153 5.77506174l-.00413847.22493826v7.407l5.42874627-5.4278153c.74554637-.7455464 1.93326028-.7794348 2.71900373-.1016654l.1094234.1016654 8.2318266 8.2318153 11.3946671-11.39268045c-.5346164-2.67667729-2.8501212-4.71066623-5.6587288-4.81418108zm-5.4 2c2.209139 0 4 1.790861 4 4s-1.790861 4-4 4-4-1.790861-4-4 1.790861-4 4-4zm0 2c-1.1045695 0-2 .8954305-2 2s.8954305 2 2 2 2-.8954305 2-2-.8954305-2-2-2z" fill="currentColor" fillRule="nonzero"></path>
                                </g>
                            </svg>
                        </label>

                        <button
                            type="submit"
                            className={`bg-green-700 text-white px-5 py-1 rounded-full transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                    {photoPreview && (
                        <div className="flex justify-center mt-3">
                            <div className="relative max-h-64 overflow-hidden rounded-md">
                                <img src={photoPreview} alt="Preview" className="h-full w-full object-contain" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPhoto(null);
                                        setPhotoPreview(null);
                                    }}
                                    className="absolute top-1 right-1 bg-gray-700 bg-opacity-50 text-white rounded-full px-1.5 text-xs"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {errorMsg && (
                    <p className="text-red-500 text-sm text-center mt-2">{errorMsg}</p>
                )}
            </form>
        </div>
    );
}
