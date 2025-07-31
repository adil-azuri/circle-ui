export interface User {
    id: number;
    username: string;
    full_name: string;
    bio: string;
    profile_picture: string | null;
}

export interface Thread {
    id: number;
    content: string;
    image: string;
    updateAt: string;
    likes: number;
    reply: number;
    isLiked: boolean;
    user: User;
}