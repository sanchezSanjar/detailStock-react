import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import authReducer, { logout } from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import homePageReducer from "./screens/homePage/slice";
import { createLogger } from "redux-logger";
import productPageReducer from "./screens/productsPage/slice"
import ordersPageReducer from "./screens/ordersPage/slice"

const logger = createLogger();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        homePage: homePageReducer,
        productPage: productPageReducer,
        ordersPage: ordersPageReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

// Server session expired or cookie missing: drop the stale member kept in localStorage
axios.interceptors.response.use(
    (response) => response,
    (err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401 && store.getState().auth.authMember) {
            store.dispatch(logout());
        }
        return Promise.reject(err);
    }
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;