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

const loadCartFromStorage = (): CartItem[] => {
    const stored = localStorage.getItem("cartData");
    return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem("cartData", JSON.stringify(items));
};

const initialState: CartState = {
    items: loadCartFromStorage(),
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
            saveCartToStorage(state.items);
        },
        incrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) item.quantity++;
            saveCartToStorage(state.items);
        },
        decrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) {
                item.quantity--;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.productId !== action.payload);
                }
            }
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.productId !== action.payload);
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToStorage(state.items);
        },
    },
});

export const { addToCart, incrementItem, decrementItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;