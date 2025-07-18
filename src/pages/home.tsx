import LeftSidebar from '../components/LeftSideBar';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSideBar';

const Home = () => {
    return (
        <div className='flex min-h-screen bg-zinc-800'>
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
        </div>
    );
};

export default Home;
