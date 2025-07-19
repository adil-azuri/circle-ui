import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';

interface UserState {
    username: string;
    full_name: string;
    photo_profile: string;
    bio: string;
    following: number;
    follower: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    username: '',
    full_name: '',
    photo_profile: '',
    bio: '',
    following: 0,
    follower: 0,
    isLoading: false,
    error: null,
};

export const fetchUser = createAsyncThunk<UserState, void, { rejectValue: string }>(
    'user/fetchUser ',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/auth/getuser');
            return response.data as UserState;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
        }
    }
);
console.log(fetchUser);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
            Object.assign(state, action.payload);
        },
        clearUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.isLoading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || 'Failed to fetch user data';
            });
    },
});

// Export actions and reducer
export const { updateProfile, clearUser } = userSlice.actions;
export default userSlice.reducer;
