function SidebarLeft() {
    return (
        <div className="bg-gray-900 text-green-500 w-1/4 h-screen p-5">
            <div className="">
                <h2 className="text-4xl font-bold mb-6">circle</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        Home
                    </li>
                    <li className="flex items-center">
                        Search
                    </li>
                    <li className="flex items-center">
                        Follows
                    </li>
                    <li className="flex items-center">
                        Profile
                    </li>
                </ul>
                <button className="mt-5 bg-green-500 text-white p-2 w-full rounded-4xl">Create Post</button>
            </div>
            <div className="mt-10 flex items-center">
                Logout
            </div>
        </div>
    );
}

export default SidebarLeft;
