import type { Product } from "./product";
import type { Member } from "./member";

/** REACT APP STATE */
export interface RootState {
    homePage: HomePageState;
    productPage: ProductPageState;
    ordersPage: OrdersPageState;
}

/** HOMEPAGE */
export interface HomePageState {
    popularProducts: Product[];
    newProducts: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE */
export interface ProductPageState {
    shop: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

/** ORDERS PAGE — placeholder until order types are built */
export interface OrdersPageState {
    pausedOrders: unknown[];
    processOrders: unknown[];
    finishedOrders: unknown[];
}