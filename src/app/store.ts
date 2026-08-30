import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;