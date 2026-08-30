import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import type { Product } from "../../../lib/types/product";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import type { RootState } from "../../store";

const processOrdersRetriever = createSelector(retrieveProcessOrders, (processOrders) => ({ processOrders }));

interface ProcessOrdersProps {
    setValue: (input: string) => void;
    setOrderBuilder: (input: Date) => void;
}

export default function ProcessOrders({ setValue, setOrderBuilder }: ProcessOrdersProps) {
    const authMember = useSelector((state: RootState) => state.auth.authMember);
    const { processOrders } = useSelector(processOrdersRetriever);

    const finishOrderHandler = async (orderId: string) => {
        try {
            if (!authMember) throw new Error("Please login first!");
            const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.FINISH };
            const confirmation = window.confirm("Have you received the order?");
            if (confirmation) {
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
                {processOrders?.map((order: Order) => (
                    <Box key={order._id} className={"order-main-box"}>
                        <Box className={"order-box-scroll"}>
                            {order?.orderItems?.map((item: OrderItem) => {
                                const product: Product | undefined = order.productData.find((ele) => item.productId === ele._id);
                                if (!product) return null;
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                return (
                                    <Box key={item._id} className={"orders-name-price"}>
                                        <img src={imagePath} className={"order-dish-img"} alt="" />
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
                            <p className={"data-compl"}>{moment().format("YY-MM-DD HH:mm")}</p>
                            <Button onClick={() => finishOrderHandler(order._id)} variant="contained" className={"verify-button"}>
                                Verify to Fulfil
                            </Button>
                        </Box>
                    </Box>
                ))}

                {(!processOrders || processOrders.length === 0) && (
                    <Box className={"no-data"}>No orders in process</Box>
                )}
            </Stack>
        </TabPanel>
    );
}