
import { useNavigate } from "react-router-dom";
import { Logout } from "../../components/Left_Componen/logout";
import { Thread_Dialog } from "../../components/Left_Componen/thread_dialog";

function SidebarLeft() {
    const navigate = useNavigate();

    return (
        <div className="w-2xl h-full text-white">
            <div className="h-screen flex flex-col justify-between p-5">
                <div className="space-y-">
                    <h2 className="text-4xl text-green-500 font-bold mb-6">circle</h2>
                    <ul className="space-y-5 text-xl font-semibold">
                        <li className="flex items-center cursor-pointer"
                            onClick={() => navigate('/home')}
                        >Home</li>
                        <li className="flex items-center cursor-pointer">Search</li>
                        <li className="flex items-center cursor-pointer"
                            onClick={() => navigate('/home/follow')}>
                            Follows</li>
                        <li className="flex items-center cursor-pointer">Profile</li>
                    </ul>
                    <Thread_Dialog />
                </div>
                <Logout />
            </div>
        </div>
    );
}

export default SidebarLeft;
