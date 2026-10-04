import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
    productLeftCount?: number;
}

interface CartState {
    items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
    const stored = localStorage.getItem("cartData");
    try {
        const items = stored ? JSON.parse(stored) : [];
        return Array.isArray(items) ? items.filter((item) => item?.productId) : [];
    } catch {
        return [];
    }
};

// Items saved before stock was tracked have no limit
const withinStock = (item: CartItem, quantity: number) =>
    item.productLeftCount === undefined ? quantity : Math.min(quantity, item.productLeftCount);

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
            if (action.payload.productLeftCount === 0) return;
            const existing = state.items.find(i => i.productId === action.payload.productId);
            if (existing) {
                existing.productLeftCount = action.payload.productLeftCount;
                existing.quantity = withinStock(existing, existing.quantity + action.payload.quantity);
            } else {
                state.items.push({ ...action.payload, quantity: withinStock(action.payload, action.payload.quantity) });
            }
            saveCartToStorage(state.items);
        },
        incrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item) item.quantity = withinStock(item, item.quantity + 1);
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