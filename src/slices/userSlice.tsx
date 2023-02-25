import {
  createSlice,
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '@/apis';

export interface UserState {
  user: TUSer;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

export const getMe = createAsyncThunk(
  'users/me',
  async (access_token: string) => {
    const response = await userApi.getMe({
      access_token,
    });

    return {
      access_token: access_token,
      ...response.data,
    };
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<TUSer>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    }),
      builder.addMatcher(isPending(getMe), (state, action) => {
        state.loading = true;
      }),
      builder.addMatcher(isFulfilled(getMe), (state, action) => {
        state.loading = false;
      }),
      builder.addMatcher(isRejected(getMe), (state, action) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;
