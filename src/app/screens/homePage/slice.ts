import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularProducts: [],
    newProducts: [],
    topShops: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularProducts: (state, action) => {
            state.popularProducts = action.payload;
        },
        setNewProducts: (state, action) => {
            state.newProducts = action.payload;
        },
        setTopShops: (state, action) => {
            state.topShops = action.payload;
        },
    },
});

export const { setPopularProducts, setNewProducts, setTopShops } = homePageSlice.actions;
export default homePageSlice.reducer;