import LeftSidebar from './main_pages/Left_Sidebar';
import RightSidebar from './main_pages/Right_Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex min-h-screen w-full bg-zinc-900'>
            <LeftSidebar />
            <div className="w-1/2 text-white border-x border-gray-700">
                <Outlet />
            </div>
            <RightSidebar />
        </div>
    );
};

export default Home;
