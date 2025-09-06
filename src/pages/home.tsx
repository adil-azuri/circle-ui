import LeftSidebar from './main_pages/Left_Sidebar';
import RightSidebar from './main_pages/Right_Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex h-screen max-h-screen overflow-hidden bg-zinc-900 justify-center'>
            <div className="flex w-[1400px] ">
                <div className="flex-shrink-0">
                    <LeftSidebar />
                </div>
                <div className="flex flex-col min-h-screen h-screen text-white border-x border-gray-700 flex-grow">
                    <Outlet />
                </div>
                <div>
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;
