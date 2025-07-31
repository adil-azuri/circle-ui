import LeftSidebar from './main_pages/Left_Sidebar';
import RightSidebar from './main_pages/Right_Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex h-screen max-h-screen overflow-hidden w-full bg-zinc-900'>
            <LeftSidebar />
            <div className="flex min-h-0 h-screen text-white border-x border-gray-700 w-full ">
                <Outlet />
            </div>
            <RightSidebar />
        </div>
    );
};

export default Home;
