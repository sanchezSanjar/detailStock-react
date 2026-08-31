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
import { getImageUrl } from "../../../lib/utils/getImageUrl";
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
                <Stack direction="row" className={"my-page-frame"}>
                    <Stack direction="column" className={"my-page-left"}>
                        <Box className={"menu-name"}>Modify Member Details</Box>
                        <Box className={"menu-content"}>
                            <Settings />
                        </Box>
                    </Stack>

                    <Stack direction="column" className={"my-page-right"}>
                        <Box className={"menu-name"} sx={{ visibility: "hidden" }}>
                            Profile
                        </Box>
                        <Box className={"order-info-box"}>
                            <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
                                <img
                                    src={getImageUrl(authMember?.memberImage)}
                                    className={"order-user-avatar"}
                                    alt=""
                                />
                                <span className={"order-user-name"}>{authMember?.memberNick}</span>
                                <span className={"order-user-prof"}>{authMember?.memberType}</span>
                                <span className={"order-user-prof"}>
                                    {authMember?.memberAddress ? authMember.memberAddress : "No address"}
                                </span>
                            </Stack>
                            <Box className={"user-media-box"}>
                                <FacebookIcon />
                                <InstagramIcon />
                                <TelegramIcon />
                                <YouTubeIcon />
                            </Box>
                            <p className={"user-desc"}>
                                {authMember?.memberDesc ? authMember.memberDesc : "No description"}
                            </p>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}