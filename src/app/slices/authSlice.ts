import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Member {
    _id: string;
    memberNick: string;
    memberType: string;
    memberImage?: string;
    accessToken?: string;
}

interface AuthState {
    authMember: Member | null;
}

const initialState: AuthState = {
    authMember: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthMember: (state, action: PayloadAction<Member | null>) => {
            state.authMember = action.payload;
        },
        logout: (state) => {
            state.authMember = null;
        },
    },
});

export const { setAuthMember, logout } = authSlice.actions;
export default authSlice.reducer;