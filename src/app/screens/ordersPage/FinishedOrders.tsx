import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useAppSelector } from "../../hooks";
import { retrieveFinishedOrders } from "./selector";
import type { Order } from "../../../lib/types/order";
import OrderCard from "./OrderCard";

export default function FinishedOrders() {
    const finishedOrders = useAppSelector(retrieveFinishedOrders);

    return (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders.map((order: Order) => (
                    <OrderCard key={order._id} order={order} />
                ))}

                {finishedOrders.length === 0 && (
                    <Box className={"no-data"}>No finished orders</Box>
                )}
            </Stack>
        </TabPanel>
    );
}
