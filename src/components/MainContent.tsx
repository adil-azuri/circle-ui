import { Thread_List } from "./main_content_component/Thread_List";
import { Thread_Post } from "./main_content_component/Thread_Post";

function SidebarCenter() {
    return (
        <div className="text-white w-1/2 p-5 shadow-lg border-x border-gray-700">
            <h1 className="text-3xl mb-4 font-bold">Home</h1>

            <Thread_Post />
            <Thread_List />



        </div>
    );
}

export default SidebarCenter;
