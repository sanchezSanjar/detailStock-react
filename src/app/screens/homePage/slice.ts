import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";
import type { Product } from "../../../lib/types/product";
import type { Member } from "../../../lib/types/member";

const initialState: HomePageState = {
    popularProducts: [],
    newProducts: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularProducts: (state, action: PayloadAction<Product[]>) => {
            state.popularProducts = action.payload;
        },
        setNewProducts: (state, action: PayloadAction<Product[]>) => {
            state.newProducts = action.payload;
        },
        setTopUsers: (state, action: PayloadAction<Member[]>) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setPopularProducts, setNewProducts, setTopUsers } = homePageSlice.actions;
export default homePageSlice.reducer;