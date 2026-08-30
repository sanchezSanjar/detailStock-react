import { createSlice } from "@reduxjs/toolkit";
import type { ProductPageState } from "../../../lib/types/screen";

const initialState: ProductPageState = {
    shop: null,
    chosenProduct: null,
    products: [],
};

const productPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setShop: (state, action) => { state.shop = action.payload; },
        setChosenProduct: (state, action) => { state.chosenProduct = action.payload; },
        setProducts: (state, action) => { state.products = action.payload; },
    },
});

export const { setShop, setChosenProduct, setProducts } = productPageSlice.actions;
export default productPageSlice.reducer;