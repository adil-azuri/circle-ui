import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';

interface Like {
    id: number;
    user_id: number;
    thread_id: number;
    created_at: string;
    created_by: string | null;
    updated_at: string;
    updated_by: string | null;
}

interface UserAccount {
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
    likes: Like[];
    likedThreads: number[]; // thread_id yang sudah di-like user
}

interface UserState {
    account: UserAccount | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    account: null,
    isLoading: false,
    error: null,
};

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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserAccount>>) => {
            if (state.account) {
                Object.assign(state.account, action.payload);
                try {
                    localStorage.setItem('user', JSON.stringify(state.account));
                } catch (e) { }
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
                // Inisialisasi likedThreads dari likes
                const likedThreads = action.payload.likes ? action.payload.likes.map(like => like.thread_id) : [];
                state.account = { ...action.payload, likedThreads };
                state.isLoading = false;
                try {
                    localStorage.setItem('user', JSON.stringify({ ...action.payload, likedThreads }));
                } catch (e) { }
            })
            .addCase(fetchUser.rejected, (state: UserState, action: any) => {
                state.isLoading = false;
                state.error = (action.payload as string) || 'Failed to fetch user data';
            });
    },
});

export const { updateProfile, addLikedThread, removeLikedThread, clearUser } = userSlice.actions;
export default userSlice.reducer;
