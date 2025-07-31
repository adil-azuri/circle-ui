
import { Thread_List } from "../../components/All_thread/Thread_List";
import { Thread_Post } from "../../components/All_thread/Thread_Post";


export const Center_All_Thread = () => {
    return (
        <div className="flex flex-col h-full min-h-0 shadow-lg border-gray-700 w-full">
            <h1 className="text-2xl font-bold text-green-400 font-sans p-3" >HOME</h1>
            <Thread_Post />
            <div className="flex-1 min-h-0">
                <Thread_List />
            </div>
        </div>
    );
}

