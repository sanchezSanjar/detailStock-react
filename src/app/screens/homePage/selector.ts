import { createSelector } from "reselect";
import type { RootState } from "../../store";

const selectHomePage = (state: RootState) => state.homePage;

export const retrievePopularProducts = createSelector(selectHomePage, (h) => h.popularProducts);
export const retrieveNewProducts = createSelector(selectHomePage, (h) => h.newProducts);
export const retrieveTopShops = createSelector(selectHomePage, (h) => h.topShops);