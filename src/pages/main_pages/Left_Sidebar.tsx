import { useNavigate } from "react-router-dom";
import { Logout } from "../../components/Left_Componen/logout";
import { Thread_Dialog } from "../../components/Left_Componen/thread_dialog";

function SidebarLeft() {
    const navigate = useNavigate();

    return (
        <div className="overflow-y-auto text-white w-[320px] p-2">
            <div className="flex flex-col justify-between h-full p-5">
                <div>
                    <h2 className="text-4xl text-green-500 font-bold mb-6">circle</h2>
                    <ul className="space-y-5 text-xl font-semibold">

                        <li className="flex items-center cursor-pointer hover:text-blue-400"
                            onClick={() => navigate('/home')}>
                            Home
                        </li>

                        <li className="flex items-center cursor-pointer hover:text-blue-400"
                            onClick={() => navigate('/home/search')}>
                            Search</li>

                        <li className="flex items-center cursor-pointer hover:text-blue-400"
                            onClick={() => navigate('/home/follow')}>
                            Follows</li>

                        <li className="flex items-center cursor-pointer hover:text-blue-400"
                            onClick={() => navigate('/home/profile')}>
                            Profile
                        </li>
                    </ul>
                    <Thread_Dialog />
                </div>
                <div className="mt-60">
                    <Logout />
                </div>
            </div>
        </div>
    );
}

export default SidebarLeft;
