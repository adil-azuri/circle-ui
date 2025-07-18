import { Card, CardHeader, CardContent, } from "./ui/card";

function SidebarRight() {
    return (
        <aside className="w-full max-w-sm hidden lg:flex flex-col p-2  rounded-l-md select-none">
            <Card className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-xl mb-5">
                <CardHeader className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 shadow-inner">
                        <img src="" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-white ml-4">
                        <h3 className="font-semibold text-lg">✨ Stella Audhina ✨</h3>
                        <p className="text-sm">@audhinah</p>
                    </div>
                    <button className=" bg-gray-900 text-green-500 px-2 py-1 text-xs rounded-full hover:bg-gray-700 transition-colors duration-200">
                        Edit Profile
                    </button>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-around text-white font-semibold mt-4 text-xs">
                        <div className="text-center">
                            <div>291</div>
                            <div className="text-[10px] font-normal">Following</div>
                        </div>
                        <div className="text-center">
                            <div>23</div>
                            <div className="text-[10px] font-normal">Followers</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6 p-3 rounded-lg">
                <CardHeader>
                    <h3 className="text-lg font-bold mb-3 text-gray-300">Suggested for you</h3>
                </CardHeader>
                <ul className="space-y-2">
                    {[
                        { name: "Mohammed Jawahir", username: "@em_jawahir", following: true },
                        { name: "Shakia Kimathi", username: "@shakiakim", following: false },

                    ].map((user) => (
                        <li key={user.username} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                    {/* Placeholder for user image / avatar */}
                                    <span className="text-white">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-3">
                                    <div className="font-semibold text-gray-300">{user.name}</div>
                                    <div className="text-xs text-gray-500">{user.username}</div>
                                </div>
                            </div>
                            <button className={`rounded-full px-3 py-1 text-xs font-medium ${user.following ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}>
                                {user.following ? 'Following' : 'Follow'}
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>

            <div className="mt-4 pt-4 border-t border-gray-600 text-gray-500 text-xs">
                Developed by <span className="font-semibold text-gray-300">Your Name</span> •
                <a href="https://www.dumbways.id" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400 transition-colors">
                    DumbWays Indonesia
                </a> • #1 Coding Bootcamp
            </div>


        </aside>
    );
}

export default SidebarRight;
