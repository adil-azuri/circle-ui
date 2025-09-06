import { useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { User_profile } from '@/components/UserProfile/User_Profile';
import { useNavigate } from 'react-router-dom';
import { MyThread } from '@/components/UserProfile/MyThread';
import { MyProfileMedia } from '@/components/UserProfile/MyProfileMedia';

export const Center_Profile = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('mypost');

    return (
        <div className="flex flex-col h-full shadow-lg border-gray-700 w-full">
            <div className="px-4 flex flex-col h-full">
                <div className="flex items-center mb-2">
                    <button
                        className="text-green-400 font-bold text-2xl"
                        onClick={() => navigate('/home')}
                    >
                        ← Profile
                    </button>
                </div>

                <User_profile />

                <div className="flex w-full flex-col overflow-y-auto flex-grow max-h-[calc(100vh-200px)]">
                    <Tabs defaultValue="mypost" onValueChange={setActiveTab}>
                        <TabsList className="flex w-full">
                            <TabsTrigger value="mypost" className={activeTab === 'mypost' ?
                                'transition-colors rounded-none border-b-2 border-b-green-500' : ''}>
                                My Post
                            </TabsTrigger>
                            <TabsTrigger value="media" className={activeTab === 'media' ?
                                'transition-colors rounded-none border-b-2 border-b-green-500' : ''}>
                                Media
                            </TabsTrigger>

                        </TabsList>

                        <TabsContent value="mypost">
                            <MyThread />
                        </TabsContent>

                        <TabsContent value="media">
                            <MyProfileMedia />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
