import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/api';

interface UserAccount {
    id: number;
    username: string;
    full_name: string;
    email: string;
    password: string;
    photo_profile: string | null;
    bio: string | null;
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
            return response.data.account as UserAccount; // Extract user from response
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
        }
    }
);

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserAccount>>) => {
            if (state.account) {
                Object.assign(state.account, action.payload);
                // Save updated user to localStorage
                try {
                    localStorage.setItem('user', JSON.stringify(state.account));
                } catch (e) {
                    // Optional: handle localStorage error
                }
            }
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
                state.account = action.payload;
                state.isLoading = false;
                // Save user data to localStorage
                try {
                    localStorage.setItem('user', JSON.stringify(action.payload));
                } catch (e) {
                    // Optional: handle localStorage error
                }
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
