import { useEffect, useState, type SyntheticEvent } from "react";
import { Box, Container, Stack, Tabs, Tab, Pagination } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { retrieveFinishedOrders, retrievePausedOrders, retrieveProcessOrders } from "./selector";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import "../../css/order.css";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

const ORDERS_LIMIT = 5;

export default function OrdersPage() {
    const dispatch = useAppDispatch();
    const authMember = useAppSelector((state) => state.auth.authMember);
    const navigate = useNavigate();
    const [value, setValue] = useState("1");
    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
    const [pages, setPages] = useState<Record<string, number>>({ "1": 1, "2": 1, "3": 1 });
    const pausedOrders = useAppSelector(retrievePausedOrders);
    const processOrders = useAppSelector(retrieveProcessOrders);
    const finishedOrders = useAppSelector(retrieveFinishedOrders);

    useEffect(() => {
        if (!authMember) return;
        const order = new OrderService();

        order.getMyOrders({ page: pages["1"], limit: ORDERS_LIMIT, orderStatus: OrderStatus.PAUSE })
            .then((data) => dispatch(setPausedOrders(data)))
            .catch((err) => console.log(err));

        order.getMyOrders({ page: pages["2"], limit: ORDERS_LIMIT, orderStatus: OrderStatus.PROCESS })
            .then((data) => dispatch(setProcessOrders(data)))
            .catch((err) => console.log(err));

        order.getMyOrders({ page: pages["3"], limit: ORDERS_LIMIT, orderStatus: OrderStatus.FINISH })
            .then((data) => dispatch(setFinishedOrders(data)))
            .catch((err) => console.log(err));
    }, [dispatch, authMember, pages, orderBuilder]);

    useEffect(() => {
        if (!authMember) navigate("/");
    }, [authMember, navigate]);

    const handleChange = (_e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const currentOrders = value === "1" ? pausedOrders : value === "2" ? processOrders : finishedOrders;
    const currentPage = pages[value];

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
                        <Stack className={"order-pagination"} sx={{ alignItems: "center", my: 2 }}>
                            <Pagination
                                count={currentOrders.length === ORDERS_LIMIT ? currentPage + 1 : currentPage}
                                page={currentPage}
                                color={"secondary"}
                                onChange={(_e, page) => setPages((prev) => ({ ...prev, [value]: page }))}
                            />
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order-right"}>
                    <Box className={"order-info-box"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={getImageUrl(authMember?.memberImage)}
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