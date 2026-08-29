import { configureStore } from "@reduxjs/toolkit";
// import HomePageReducer from "./screens/homePage/slice";
// import ProductsPageReducer from "./screens/productsPage/slice";
// import OrdersPageReducer from "./screens/ordersPage/slice";
import reduxLogger from "redux-logger";

export const store = configureStore({

  reducer: {
    // homePage: HomePageReducer,
    // productsPage: ProductsPageReducer,
    // ordersPage: OrdersPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;