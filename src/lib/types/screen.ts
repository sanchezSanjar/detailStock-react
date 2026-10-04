import type { Product } from "./product";
import type { Member } from "./member";
import type { Order } from "./order";

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

/** ORDERS PAGE */
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}
