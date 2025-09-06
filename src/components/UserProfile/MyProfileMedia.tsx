import { useSelector } from 'react-redux';

export function MyProfileMedia() {
    const threads = useSelector((state: any) => state.user.account?.threads || []);
    const mediaThreads = threads.filter((thread: any) => thread.image);

    if (!mediaThreads.length) {
        return <div className="text-gray-400 p-4">No media available.</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-0">
            {mediaThreads.map((thread: any) => (
                <div key={thread.id} className="flex w-full rounded overflow-hidden">
                    <img
                        src={thread.image}
                        alt="Media post"
                        className="w-full p-1 object-contain rounded-2xl bg-zinc-800"
                    />
                </div>
            ))}
        </div>
    );
}
