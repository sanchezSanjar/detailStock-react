import axios from "axios";
import { serverApi } from "../../lib/config";
import type { CartItem } from "../slices/cartSlice";
import type { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../../lib/types/order";

class OrderService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }

    public async createOrder(input: CartItem[]): Promise<Order> {
        try {
            const orderItems: OrderItemInput[] = input.map((cartItem) => ({
                itemQuantity: cartItem.quantity,
                itemPrice: cartItem.productPrice,
                productId: cartItem.productId,
            }));
            const url = this.path + "/order/create";
            const result = await axios.post(url, orderItems, { withCredentials: true });
            return result.data;
        } catch (err) {
            console.log("Error, createOrder:", err);
            throw err;
        }
    }

    public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
        try {
            const url = `${this.path}/order/all?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
            const result = await axios.get(url, { withCredentials: true });
            return result.data;
        } catch (err) {
            console.log("Error, getMyOrders:", err);
            throw err;
        }
    }

    public async updateOrder(input: OrderUpdateInput): Promise<Order> {
        try {
            const url = `${this.path}/order/update`;
            const result = await axios.post(url, input, { withCredentials: true });
            return result.data.result;   // ← unwrap the extra nesting
        } catch (err) {
            console.log("Error, updateOrder:", err);
            throw err;
        }
    }
}

export default OrderService;