import { useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Follower } from '@/components/following_follower/follower';
import { Following } from '@/components/following_follower/following';

export const Center_Follow = () => {
    const [activeTab, setActiveTab] = useState('follower');

    return (
        <div className="shadow-lg border-gray-700 w-full">
            <div className="px-4 pt-3">
                <h1 className="text-2xl font-bold text-green-400 font-sans">Follow</h1>

                <div className="flex w-full flex-col gap-6">
                    <Tabs defaultValue="follower" onValueChange={setActiveTab}>
                        <TabsList className="flex w-full">

                            <TabsTrigger value="follower" className={activeTab === 'follower' ?
                                'transition-colors rounded-none border-b-2 border-b-green-500' : ''}>
                                <p>Follower</p>
                            </TabsTrigger>

                            <TabsTrigger value="following" className={activeTab === 'following' ?
                                'transition-colors rounded-none border-b-2 border-b-green-500' : ''}>
                                Following
                            </TabsTrigger>

                        </TabsList>

                        <TabsContent value="follower">
                            <div>
                                <Follower />
                            </div>
                        </TabsContent>

                        <TabsContent value="following">
                            <div>
                                <Following />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
