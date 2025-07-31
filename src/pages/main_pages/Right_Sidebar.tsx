import { Suggest_Follow } from '@/components/Right_Component/Suggest_Follow';
import { Profile } from '@/components/Right_Component/Profile';

function SidebarRight() {
    return (
        <aside className="flex flex-col h-full min-h-0 w-3xl max-w-full p-2 gap-4">
            <Profile />
            <div className="flex flex-col flex-1 min-h-0">
                <Suggest_Follow />
                <div className="flex-1" >

                    <div className="mt-4 pt-4 border-t border-gray-600 text-gray-500 text-xs">
                        Developed by <span className="font-semibold text-gray-300">Adil</span> •
                        <a className="underline hover:text-green-400 transition-colors">
                            DumbWays Indonesia
                        </a> • #1 Coding Bootcamp
                    </div>

                </div>
            </div>
        </aside>
    );
}

export default SidebarRight;
