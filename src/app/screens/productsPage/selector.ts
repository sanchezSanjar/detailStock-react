import { createSelector } from "reselect";
import type { RootState } from "../../store";

const selectProductsPage = (state: RootState) => state.productPage;

export const retrieveShop = createSelector(selectProductsPage, (p) => p.shop);
export const retrieveChosenProduct = createSelector(selectProductsPage, (p) => p.chosenProduct);
export const retrieveProducts = createSelector(selectProductsPage, (p) => p.products);