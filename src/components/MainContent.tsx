import React, { useState } from "react";
import { ThreadDetail } from "./main_content_component/Thread_Detail";
import { Thread_List } from "./main_content_component/Thread_List";
import { Thread_Post } from "./main_content_component/Thread_Post";

const SidebarCenter: React.FC = () => {
    const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
    const handleThreadClick = (threadId: number) => {
        setSelectedThreadId(threadId);
    };
    const handleClose = () => {
        setSelectedThreadId(null);
    };

    return (
        <div className="text-white w-1/2 p-5 shadow-lg border-x border-gray-700">
            <h1 className="text-3xl font-bold mb-2">Home</h1>
            {selectedThreadId && (
                <div>
                    <div className="flex items-center justify-between transistion">
                        <h1 className="text-xl text-green-500 font-bold" >Thread Detail</h1>
                        <button
                            onClick={handleClose}
                            className="text-sm flex justify-end mt-4 px-2 py-1 bg-red-600 text-white rounded-full"
                        >
                            Close
                        </button>
                    </div>
                    <ThreadDetail threadId={selectedThreadId} />
                </div>

            )}
            <Thread_Post />
            <Thread_List onThreadClick={handleThreadClick} />
        </div>
    );
}

export default SidebarCenter;
