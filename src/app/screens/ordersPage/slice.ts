import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrdersPageState } from "../../../lib/types/screen";
import type { Order } from "../../../lib/types/order";

const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
};

const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action: PayloadAction<Order[]>) => { state.pausedOrders = action.payload; },
        setProcessOrders: (state, action: PayloadAction<Order[]>) => { state.processOrders = action.payload; },
        setFinishedOrders: (state, action: PayloadAction<Order[]>) => { state.finishedOrders = action.payload; },
    },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } = ordersPageSlice.actions;
export default ordersPageSlice.reducer;