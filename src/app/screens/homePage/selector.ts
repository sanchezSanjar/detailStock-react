import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const selectHomePage = (state: RootState) => state.homePage;

export const retrievePopularProducts = createSelector(selectHomePage, (h) => h.popularProducts);
export const retrieveNewProducts = createSelector(selectHomePage, (h) => h.newProducts);
export const retrieveTopUsers = createSelector(selectHomePage, (h) => h.topUsers);