// user_slice

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import type { FollowRequest, UnfollowRequest, UserAccount, UserState } from '@/types/redux_types'

const initialState: UserState = {
    account: null,
    isLoading: false,
    error: null,
};


// Async thunk to fetch user data
export const fetchUser = createAsyncThunk<UserAccount, string, { rejectValue: string }>(
    'user/fetchUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response: any = await api.get(`/auth/getuser/${userId}`);
            return response.data.account as UserAccount;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
        }
    }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk<UserAccount, FormData, { rejectValue: string }>(
    'user/updateUserProfile',
    async (formData, { rejectWithValue, getState }) => {
        const state = getState() as { user: UserState };
        const userId = state.user.account?.id;

        if (!userId) {
            return rejectWithValue('User not logged in');
        }

        try {
            const response: any = await api.put(`/auth/user/update/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.account as UserAccount;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);


// Async thunk to follow a user
export const followUser = createAsyncThunk<void, FollowRequest, { rejectValue: string }>(
    'user/followUser',
    async (followRequest, { rejectWithValue }) => {
        try {
            await api.post('/follow/follow', followRequest);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to follow user');
        }
    }
);

// Async thunk to unfollow a user
export const unfollowUser = createAsyncThunk<void, UnfollowRequest, { rejectValue: string }>(
    'user/unfollowUser',
    async (unfollowRequest, { rejectWithValue }) => {
        try {
            await api.request({ method: 'delete', url: '/follow/unfollow', data: unfollowRequest });
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to unfollow user');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserAccount>>) => {
            if (state.account) {
                Object.assign(state.account, action.payload);
                try {
                    localStorage.setItem('user', JSON.stringify(state.account));
                } catch (e) {
                    console.error("Failed to save user to localStorage", e);
                }
            }
        },
        addLikedThread: (state, action: PayloadAction<number>) => {
            if (state.account) {
                if (!state.account.likedThreads) state.account.likedThreads = [];
                if (!state.account.likedThreads.includes(action.payload)) {
                    state.account.likedThreads.push(action.payload);
                }
            }
        },
        removeLikedThread: (state, action: PayloadAction<number>) => {
            if (state.account && state.account.likedThreads) {
                state.account.likedThreads = state.account.likedThreads.filter(id => id !== action.payload);
            }
        },
        clearUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state: UserState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state: UserState, action: PayloadAction<UserAccount>) => {
                const likedThreads = action.payload.likes ? action.payload.likes.map(like => like.thread_id) : [];
                // Map following to array of user ids
                let following: number[] = [];
                if (Array.isArray(action.payload.following)) {
                    following = action.payload.following.map((f: any) => f.follower_id);
                }
                state.account = { ...action.payload, likedThreads, following };
                state.isLoading = false;
                try {
                    localStorage.setItem('user', JSON.stringify({ ...action.payload, likedThreads, following }));
                } catch (e) {
                    console.error("Failed to save user to localStorage", e);
                }
            })
            .addCase(fetchUser.rejected, (state: UserState, action: any) => {
                state.isLoading = false;
                state.error = (action.payload as string) || 'Failed to fetch user data';
            })

            .addCase(updateUserProfile.pending, (state: UserState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state: UserState, action: PayloadAction<UserAccount>) => {
                state.account = { ...state.account, ...action.payload };
                state.isLoading = false;
                try {
                    localStorage.setItem('user', JSON.stringify(state.account));
                } catch (e) {
                    console.error("Failed to save user to localStorage", e);
                }
            })
            .addCase(updateUserProfile.rejected, (state: UserState, action: any) => {
                state.isLoading = false;
                state.error = (action.payload as string) || 'Failed to update profile';
            })


            .addCase(followUser.fulfilled, (state, action) => {
                if (state.account) {
                    if (!state.account.following) state.account.following = [];
                    const id = action.meta.arg.follow_id;
                    if (!state.account.following.includes(id)) {
                        state.account.following.push(id);
                    }
                }
            })
            .addCase(followUser.rejected, (_, action) => {
                // Handle error
                console.error(action.payload);
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                if (state.account && state.account.following) {
                    state.account.following = state.account.following.filter(id => id !== action.meta.arg.unfollow_id);
                }
            })
            .addCase(unfollowUser.rejected, (_, action) => {
                // Handle error
                console.error(action.payload);
            });


    },
});

// (removed duplicate export)
export const userReducer = userSlice.reducer;
export const { updateProfile, addLikedThread, removeLikedThread, clearUser } = userSlice.actions;


