import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "@/assets/avatar.png";
import { api } from "@/api/api";
import { timeAgo } from "@/lib/time_converter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSnackBar } from "@/context/SnackBarContext";
import { useWebSocket } from "@/hooks/web_socket";
import { WEBSOCKET_URL } from "@/lib/constants";

export function Reply_Thread() {
    const [replies, setReplies] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const wsUrl = WEBSOCKET_URL;
    const { id } = useParams();
    const { showSnackbar } = useSnackBar();

    useEffect(() => {
        const fetchReplyDetail = async () => {
            setLoading(true);
            try {
                const res = await api.get(`reply/?thread_id=${id}`);
                const replyData = (res.data as any)?.data?.reply;
                setReplies(replyData);
            } catch (err) {
                console.error("Failed to fetch reply detail:", err);
                alert("Failed to load reply details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchReplyDetail();
    }, [id]);

    const handleWebSocketMessage = (message: any) => {
        if (message.type === 'new_reply') {
            const updatedReply: any = message.payload;

            setReplies((prevReplies: any[]) => {

                const existingThreadIndex = prevReplies.findIndex(reply => reply.id === updatedReply.id);

                let newThreadsList;

                if (existingThreadIndex !== -1) {
                    newThreadsList = [...prevReplies];
                    newThreadsList[existingThreadIndex] = updatedReply;
                } else {
                    newThreadsList = [updatedReply, ...prevReplies];
                }
                return newThreadsList.sort((a, b) => new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime());
            });
            showSnackbar(`${updatedReply.user.full_name} membalas postingan`);

        } else {
            console.log("Received unknown WebSocket message type:", message.type);
        }
    };

    useWebSocket(wsUrl, handleWebSocketMessage);

    if (loading) {
        return <div className="text-white text-center py-4">Loading...</div>;
    }
    if (replies.length === 0) {
        return <div className="text-white text-center py-4">No replies found.</div>;
    }

    return (
        <Card className="rounded-none border-none p-3">
            <CardHeader>
                <div className="flex">
                    <h1 className="text-xl font-bold">Reply</h1>
                </div>
            </CardHeader>
            <CardContent>
                {replies.map((reply: any) => (
                    <div key={reply.id} className="border-b border-gray-600 p-3 mb-2">
                        <div className="flex space-x-4">
                            <Avatar className="size-7">
                                <AvatarImage src={reply.user.photo_profile ? `${reply.user.photo_profile}` : avatar} />
                            </Avatar>
                            <div className="flex gap-5 items-center mb-5">
                                <p className="font-bold text-sm">{reply.user.full_name}</p>
                                <p className="text-xs text-gray-400">@{reply.user.username}</p>
                                <p className="text-xs text-gray-400">{timeAgo(reply.updated_at)}</p>
                            </div>
                        </div>
                        <p className="text-sm mt-2">{reply.content}</p>
                        {reply.image && (
                            <img
                                src={`${reply.image}`}
                                className="w-full max-h-40 object-contain rounded-xl my-2"
                                alt={reply.content || "reply image"}
                            />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
