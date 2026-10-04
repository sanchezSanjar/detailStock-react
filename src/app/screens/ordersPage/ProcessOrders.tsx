import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useAppSelector } from "../../hooks";
import { retrieveProcessOrders } from "./selector";
import type { Order, OrderUpdateInput } from "../../../lib/types/order";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetConfirm, sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderCard from "./OrderCard";

interface ProcessOrdersProps {
    setValue: (input: string) => void;
    setOrderBuilder: (input: Date) => void;
}

export default function ProcessOrders({ setValue, setOrderBuilder }: ProcessOrdersProps) {
    const authMember = useAppSelector((state) => state.auth.authMember);
    const processOrders = useAppSelector(retrieveProcessOrders);

    const finishOrderHandler = async (orderId: string) => {
        try {
            if (!authMember) throw new Error("Please login first!");
            const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.FINISH };
            if (await sweetConfirm("Have you received the order?")) {
                const order = new OrderService();
                await order.updateOrder(input);
                setValue("3");
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders.map((order: Order) => (
                    <OrderCard key={order._id} order={order}>
                        <p className={"data-compl"}>{moment(order.updatedAt).format("YY-MM-DD HH:mm")}</p>
                        <Button onClick={() => finishOrderHandler(order._id)} variant="contained" className={"verify-button"}>
                            Verify to Fulfil
                        </Button>
                    </OrderCard>
                ))}

                {processOrders.length === 0 && (
                    <Box className={"no-data"}>No orders in process</Box>
                )}
            </Stack>
        </TabPanel>
    );
}
