export interface Like {
    id: number;
    user_id: number;
    thread_id: number;
    created_at: string;
    created_by: string | null;
    updated_at: string;
    updated_by: string | null;
}

import type { Thread } from './threadsType';

export interface UserAccount {
    id: number;
    username: string;
    email: string;
    password: string;
    full_name: string;
    photo_profile: string | null;
    bio: string | null;
    createdAt: string;
    createdBy: string | null;
    updatedAt: string;
    updatedBy: string | null;
    following: any[];
    follower: any[];
    likes: Like[];
    likedThreads: number[];
    threads?: Thread[];
}

export interface UserState {
    account: UserAccount | null;
    isLoading: boolean;
    error: string | null;
}

export interface FollowRequest {
    follow_id: number;
}
export interface UnfollowRequest {
    unfollow_id: number;
}