import type { ReactNode } from "react";
import { Box } from "@mui/material";
import type { Order, OrderItem } from "../../../lib/types/order";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import { formatPrice } from "../../../lib/utils/formatPrice";

interface OrderCardProps {
    order: Order;
    children?: ReactNode;
}

export default function OrderCard({ order, children }: OrderCardProps) {
    return (
        <Box className={"order-main-box"}>
            <Box className={"order-box-scroll"}>
                {order.orderItems?.map((item: OrderItem) => {
                    const product = order.productData.find((ele) => item.productId === ele._id);
                    if (!product) return null;
                    const imagePath = getImageUrl(product.productImages[0]);
                    return (
                        <Box key={item._id} className={"orders-name-price"}>
                            <img src={imagePath} className={"order-dish-img"} alt={product.productName} />
                            <p className={"title-dish"}>{product.productName}</p>
                            <Box className={"price-box"}>
                                <p>{formatPrice(item.itemPrice)}</p>
                                <p>x {item.itemQuantity}</p>
                                <p style={{ marginLeft: "15px" }}>{formatPrice(item.itemQuantity * item.itemPrice)}</p>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                    <p>Product price: {formatPrice(order.orderTotal - order.orderDelivery)}</p>
                    <p>Delivery: {formatPrice(order.orderDelivery)}</p>
                    <p>Total: {formatPrice(order.orderTotal)}</p>
                </Box>
                {children}
            </Box>
        </Box>
    );
}
