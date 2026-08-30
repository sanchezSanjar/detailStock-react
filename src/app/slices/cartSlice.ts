import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(i => i.productId === action.payload.productId);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        incrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) item.quantity++;
        },
        decrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) {
                item.quantity--;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.productId !== action.payload);
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.productId !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, incrementItem, decrementItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;