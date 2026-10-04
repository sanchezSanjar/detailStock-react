import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductPageState } from "../../../lib/types/screen";
import type { Product } from "../../../lib/types/product";
import type { Member } from "../../../lib/types/member";

const initialState: ProductPageState = {
    shop: null,
    chosenProduct: null,
    products: [],
};

const productPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setShop: (state, action: PayloadAction<Member>) => { state.shop = action.payload; },
        setChosenProduct: (state, action: PayloadAction<Product>) => { state.chosenProduct = action.payload; },
        setProducts: (state, action: PayloadAction<Product[]>) => { state.products = action.payload; },
    },
});

export const { setShop, setChosenProduct, setProducts } = productPageSlice.actions;
export default productPageSlice.reducer;