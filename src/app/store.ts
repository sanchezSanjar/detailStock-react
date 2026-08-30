import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import ProductsPageReducer from "./screens/productsPage/slice";
// import OrdersPageReducer from "./screens/ordersPage/slice";
import { createLogger } from "redux-logger";
import cartReducer from "./slices/cartSlice";

const logger = createLogger();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // productsPage: ProductsPageReducer,
    // ordersPage: OrdersPageReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;