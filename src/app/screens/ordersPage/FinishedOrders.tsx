import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import type { Order, OrderItem } from "../../../lib/types/order";
import type { Product } from "../../../lib/types/product";

const finishedOrdersRetriever = createSelector(retrieveFinishedOrders, (finishedOrders) => ({ finishedOrders }));

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);

    return (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders?.map((order: Order) => (
                    <Box key={order._id} className={"order-main-box"}>
                        <Box className={"order-box-scroll"}>
                            {order?.orderItems?.map((item: OrderItem) => {
                                const product: Product | undefined = order.productData.find((ele) => item.productId === ele._id);
                                if (!product) return null;
                                const imagePath = getImageUrl(product.productImages[0]);
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
                        </Box>
                    </Box>
                ))}

                {(!finishedOrders || finishedOrders.length === 0) && (
                    <Box className={"no-data"}>No finished orders</Box>
                )}
            </Stack>
        </TabPanel>
    );
}