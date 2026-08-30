import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import type { Product } from "../../../lib/types/product";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import type { RootState } from "../../store";

const pausedOrdersRetriever = createSelector(retrievePausedOrders, (pausedOrders) => ({ pausedOrders }));

interface PausedOrdersProps {
    setValue: (input: string) => void;
    setOrderBuilder: (input: Date) => void;
}

export default function PausedOrders({ setValue, setOrderBuilder }: PausedOrdersProps) {
    const authMember = useSelector((state: RootState) => state.auth.authMember);
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    const deleteOrderHandler = async (orderId: string) => {
        try {
            if (!authMember) throw new Error("Please login first!");
            const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.DELETE };
            const confirmation = window.confirm("Do you want to delete the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const processOrderHandler = async (orderId: string) => {
        try {
            if (!authMember) throw new Error("Please login first!");
            const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.PROCESS };
            const confirmation = window.confirm("Do you want to process the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                setValue("2");
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) => (
                    <Box key={order._id} className={"order-main-box"}>
                        <Box className={"order-box-scroll"}>
                            {order?.orderItems?.map((item: OrderItem) => {
                                const product: Product | undefined = order.productData.find((ele) => item.productId === ele._id);
                                if (!product) return null;
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                return (
                                    <Box key={item._id} className={"orders-name-price"}>
                                        <img src={imagePath} className={"order-dish-img"} alt={product.productName} />
                                        <p className={"title-dish"}>{product.productName}</p>
                                        <Box className={"price-box"}>
                                            <p>${item.itemPrice}</p>
                                            <p>x {item.itemQuantity}</p>
                                            <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box className={"total-price-box"}>
                            <Box className={"box-total"}>
                                <p>Product price: ${order.orderTotal - order.orderDelivery}</p>
                                <p>Delivery: ${order.orderDelivery}</p>
                                <p>Total: ${order.orderTotal}</p>
                            </Box>
                            <Button variant="contained" color="secondary" className={"cancel-button"} onClick={() => deleteOrderHandler(order._id)}>
                                Cancel
                            </Button>
                            <Button variant="contained" className={"pay-button"} onClick={() => processOrderHandler(order._id)}>
                                Confirm Order
                            </Button>
                        </Box>
                    </Box>
                ))}

                {(!pausedOrders || pausedOrders.length === 0) && (
                    <Box className={"no-data"}>No paused orders</Box>
                )}
            </Stack>
        </TabPanel>
    );
}