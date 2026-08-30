import { useEffect, useState, type SyntheticEvent } from "react";
import { Box, Container, Stack, Tabs, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import type { OrderInquiry, Order } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import "../../css/order.css";
import { serverApi } from "../../../lib/config";
import type { RootState } from "../../store";

const actionDispatch = (dispatch: Dispatch) => ({
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

export default function OrdersPage() {
    const { setFinishedOrders, setPausedOrders, setProcessOrders } = actionDispatch(useDispatch());
    const authMember = useSelector((state: RootState) => state.auth.authMember);
    const navigate = useNavigate();
    const [value, setValue] = useState("1");
    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
    const [orderInquiry] = useState<OrderInquiry>({ page: 1, limit: 5, orderStatus: OrderStatus.PAUSE });

    useEffect(() => {
        const order = new OrderService();

        order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
            .then((data) => setPausedOrders(data))
            .catch((err) => console.log(err));

        order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
            .then((data) => setProcessOrders(data))
            .catch((err) => console.log(err));

        order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
            .then((data) => setFinishedOrders(data))
            .catch((err) => console.log(err));
    }, [orderInquiry, orderBuilder]);

    useEffect(() => {
        if (!authMember) navigate("/");
    }, [authMember, navigate]);

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!authMember) return null;

    return (
        <div className={"order-page"}>
            <Container className="order-container">
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-nav-frame"}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs value={value} onChange={handleChange} className={"table_list"}>
                                    <Tab label="PAUSED ORDERS" value={"1"} />
                                    <Tab label="PROCESS ORDERS" value={"2"} />
                                    <Tab label="FINISHED ORDERS" value={"3"} />
                                </Tabs>
                            </Box>
                        </Box>
                        <Stack className={"order-main-content"}>
                            <PausedOrders setValue={setValue} setOrderBuilder={setOrderBuilder} />
                            <ProcessOrders setValue={setValue} setOrderBuilder={setOrderBuilder} />
                            <FinishedOrders />
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order-right"}>
                    <Box className={"order-info-box"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                                    className={"order-user-avatar"}
                                    alt=""
                                />
                            </div>
                            <span className={"order-user-name"}>{authMember?.memberNick}</span>
                            <span className={"order-user-prof"}>{authMember?.memberType}</span>
                        </Box>
                        <Box className={"liner"}></Box>
                        <Box className={"order-user-address"}>
                            <LocationOnIcon />
                            <div className={"spec-address-txt"}>
                                {authMember?.memberAddress ? authMember.memberAddress : "No address on file"}
                            </div>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}