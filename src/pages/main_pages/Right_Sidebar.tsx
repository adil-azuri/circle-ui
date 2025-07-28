import { Follow } from '@/components/Right_Component/Follow';
import { Profile } from '@/components/Right_Component/Profile';

function SidebarRight() {
    return (
        <aside className="max-w-full p-2">

            <Profile />

            <Follow />


            <div className="mt-4 pt-4 border-t border-gray-600 text-gray-500 text-xs">
                Developed by <span className="font-semibold text-gray-300">Your Name</span> •
                <a href="https://www.dumbways.id" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400 transition-colors">
                    DumbWays Indonesia
                </a> • #1 Coding Bootcamp
            </div>
        </aside>
    );
}

export default SidebarRight;
