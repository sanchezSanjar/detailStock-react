import { Box, Button, Stack, Typography } from "@mui/material";
import type { Order } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

interface OrderCardProps {
    order: Order;
    onUpdateStatus?: (orderId: string, newStatus: OrderStatus) => void;
}

export default function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
    return (
        <Box className={"order-card"}>
            <Stack className={"order-items"}>
                {order.orderItems.map((item) => {
                    const product = order.productData.find((p) => p._id === item.productId);
                    const imagePath = getImageUrl(product?.productImages[0]);
                    return (
                        <Stack key={item._id} direction={"row"} className={"order-item-row"} sx={{ alignItems: "center", gap: 2 }}>
                            <img src={imagePath} className={"order-item-img"} alt="" />
                            <Box sx={{ flex: 1 }}>
                                <Typography className={"order-item-name"}>{product?.productName ?? "Product unavailable"}</Typography>
                                <Typography className={"order-item-qty"}>Qty: {item.itemQuantity}</Typography>
                            </Box>
                            <Typography className={"order-item-price"}>${item.itemPrice}</Typography>
                        </Stack>
                    );
                })}
            </Stack>

            <Stack direction={"row"} className={"order-footer"} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography className={"order-total"}>Total: ${order.orderTotal}</Typography>

                {order.orderStatus === OrderStatus.PAUSE && onUpdateStatus && (
                    <Button variant="contained" className={"order-action-btn"} onClick={() => onUpdateStatus(order._id, OrderStatus.PROCESS)}>
                        Confirm Order
                    </Button>
                )}
                {order.orderStatus === OrderStatus.PROCESS && onUpdateStatus && (
                    <Button variant="contained" className={"order-action-btn"} onClick={() => onUpdateStatus(order._id, OrderStatus.FINISH)}>
                        Mark as Finished
                    </Button>
                )}
                {order.orderStatus === OrderStatus.FINISH && (
                    <Typography className={"order-finished-label"}>✓ Completed</Typography>
                )}
            </Stack>
        </Box>
    );
}