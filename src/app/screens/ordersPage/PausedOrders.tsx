import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useAppSelector } from "../../hooks";
import { retrievePausedOrders } from "./selector";
import type { Order, OrderUpdateInput } from "../../../lib/types/order";
import { sweetConfirm, sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import OrderCard from "./OrderCard";

interface PausedOrdersProps {
    setValue: (input: string) => void;
    setOrderBuilder: (input: Date) => void;
}

export default function PausedOrders({ setValue, setOrderBuilder }: PausedOrdersProps) {
    const authMember = useAppSelector((state) => state.auth.authMember);
    const pausedOrders = useAppSelector(retrievePausedOrders);

    const deleteOrderHandler = async (orderId: string) => {
        try {
            if (!authMember) throw new Error("Please login first!");
            const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.DELETE };
            if (await sweetConfirm("Do you want to delete the order?")) {
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
            if (await sweetConfirm("Do you want to process the order?")) {
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
                {pausedOrders.map((order: Order) => (
                    <OrderCard key={order._id} order={order}>
                        <Button variant="contained" color="secondary" className={"cancel-button"} onClick={() => deleteOrderHandler(order._id)}>
                            Cancel
                        </Button>
                        <Button variant="contained" className={"pay-button"} onClick={() => processOrderHandler(order._id)}>
                            Confirm Order
                        </Button>
                    </OrderCard>
                ))}

                {pausedOrders.length === 0 && (
                    <Box className={"no-data"}>No paused orders</Box>
                )}
            </Stack>
        </TabPanel>
    );
}
