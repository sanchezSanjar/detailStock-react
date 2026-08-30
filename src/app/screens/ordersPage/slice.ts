import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../../lib/types/order";

interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}

const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
};

const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action) => { state.pausedOrders = action.payload; },
        setProcessOrders: (state, action) => { state.processOrders = action.payload; },
        setFinishedOrders: (state, action) => { state.finishedOrders = action.payload; },
    },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } = ordersPageSlice.actions;
export default ordersPageSlice.reducer;