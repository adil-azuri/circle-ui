import { Suggest_Follow } from '@/components/Right_Component/Suggest_Follow';
import { Profile } from '@/components/Right_Component/Profile';
import { useLocation } from 'react-router-dom';

function SidebarRight() {
    const location = useLocation();
    const hideProfilePath = '/home/profile';

    return (
        <aside className="flex flex-col min-h-0 max-h-screen w-[380px] p-3 gap-4">
            {location.pathname !== hideProfilePath && <Profile />}
            <div className=" flex-1">
                <Suggest_Follow />
                <p className='mt-3 border-t border-gray-600 text-gray-500 text-xs'>
                    Developed by <span className="font-semibold text-gray-300">Adil</span> •
                    <a className="underline hover:text-green-400 transition-colors">
                        DumbWays Indonesia
                    </a> • #1 Coding Bootcamp
                </p>

            </div>
        </aside>
    );
}

export default SidebarRight;
