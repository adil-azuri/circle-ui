
import { Thread_List } from "../../components/All_thread/Thread_List";
import { Thread_Post } from "../../components/All_thread/Thread_Post";

export const All_Thread = () => {

    return (
        <div className="shadow-lg border-gray-700 w-full">
            <h1 className="text-2xl font-bold text-green-400 font-sans p-3" >HOME</h1>
            <Thread_Post />
            <Thread_List />
        </div>
    );
}

