import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Member } from "../../lib/types/member";

interface AuthState {
    authMember: Member | null;
}

const getInitialAuthMember = (): Member | null => {
    const stored = localStorage.getItem("memberData");
    try {
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    authMember: getInitialAuthMember(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthMember: (state, action: PayloadAction<Member | null>) => {
            state.authMember = action.payload;
            if (action.payload) {
                localStorage.setItem("memberData", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("memberData");
            }
        },
        logout: (state) => {
            state.authMember = null;
            localStorage.removeItem("memberData");
        },
    },
});

export const { setAuthMember, logout } = authSlice.actions;
export default authSlice.reducer;