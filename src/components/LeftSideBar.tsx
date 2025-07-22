import { Logout } from "./left_content_component/logout";
import { Thread_Dialog } from "./left_content_component/thread_dialog";

function SidebarLeft() {

    return (
        <div className="w-1/4 text-white p-7">
            <div className="h-screen flex flex-col justify-between">
                <div>
                    <h2 className="text-4xl text-green-500 font-bold mb-6">circle</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center">Home</li>
                        <li className="flex items-center">Search</li>
                        <li className="flex items-center">Follows</li>
                        <li className="flex items-center">Profile</li>
                    </ul>
                    <Thread_Dialog />
                </div>

                <Logout />
            </div>
        </div>
    );
}

export default SidebarLeft;
