
import { useNavigate } from "react-router-dom";
import { Select_Thread } from "@/components/Detail_Thread/Select_Thread";

export const Center_Detail_thread = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full shadow-lg border-gray-700 w-full">
            <div className="flex px-4 pt-3">
                <button
                    className="text-2xl font-bold text-green-400 font-sans"
                    onClick={() => navigate('/home')}
                >
                    <span className="text-3xl text-white font-bold"> ← </span>
                    STATUS
                </button>
            </div>
            <Select_Thread />
        </div>
    );
}

