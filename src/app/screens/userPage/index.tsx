import { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { serverApi } from "../../../lib/config";
import "../../css/userPage.css";

export default function UserPage() {
    const navigate = useNavigate();
    const authMember = useSelector((state: RootState) => state.auth.authMember);

    useEffect(() => {
        if (!authMember) navigate("/");
    }, [authMember, navigate]);

    if (!authMember) return null;

    return (
        <div className={"user-page"}>
            <Container>
                <Stack className={"my-page-frame"}>
                    <Stack className={"my-page-left"}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box className={"menu-name"}>Modify Member Details</Box>
                            <Box className={"menu-content"}>
                                <Settings />
                            </Box>
                        </Box>
                    </Stack>

                    <Stack className={"my-page-right"}>
                        <Box className={"order-info-box"}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img
                                    src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                                    className={"order-user-avatar"}
                                    alt=""
                                />
                                <span className={"order-user-name"}>{authMember?.memberNick}</span>
                                <span className={"order-user-prof"}>{authMember?.memberType}</span>
                                {/* <span className={"order-user-prof"}>
                                    {authMember?.memberAddress ? authMember.memberAddress : "No address"}
                                </span> */}
                            </Box>
                            <Box className={"user-media-box"}>
                                <FacebookIcon />
                                <InstagramIcon />
                                <TelegramIcon />
                                <YouTubeIcon />
                            </Box>
                            {/* <p className={"user-desc"}>
                                {authMember?.memberDesc ? authMember.memberDesc : "No description"}
                            </p> */}
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}