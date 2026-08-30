import { createSelector } from "reselect";
import type { RootState } from "../../store";

const selectOrdersPage = (state: RootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(selectOrdersPage, (o) => o.pausedOrders);
export const retrieveProcessOrders = createSelector(selectOrdersPage, (o) => o.processOrders);
export const retrieveFinishedOrders = createSelector(selectOrdersPage, (o) => o.finishedOrders);