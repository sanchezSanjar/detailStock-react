import { Box, Container, Stack } from "@mui/material";
// import Divider from "../../components/divider";
import { useCountUp } from "../../hooks/useCountUp";

export default function Statistics() {
    const shopsCount = useCountUp(12);
    const feedbacksCount = useCountUp(8);
    const productsCount = useCountUp(50);
    const customersCount = useCountUp(200);

    return (
        <div className={"stats-bar"}>
            <Container>
                <Stack direction={"row"} sx={{ justifyContent: "space-around", alignItems: "center" }}>
                    <Stack sx={{ alignItems: "center" }} className="stat-item">
                        <Box className="stat-number">{shopsCount}</Box>
                        <Box className="stat-label">Shops</Box>
                    </Stack>
                    <div className="stat-divider" />
                    <Stack sx={{ alignItems: "center" }} className="stat-item">
                        <Box className="stat-number">{feedbacksCount}</Box>
                        <Box className="stat-label">Feedbacks</Box>
                    </Stack>
                    <div className="stat-divider" />
                    <Stack sx={{ alignItems: "center" }} className="stat-item">
                        <Box className="stat-number">{productsCount}+</Box>
                        <Box className="stat-label">Products</Box>
                    </Stack>
                    <div className="stat-divider" />
                    <Stack sx={{ alignItems: "center" }} className="stat-item">
                        <Box className="stat-number">{customersCount}+</Box>
                        <Box className="stat-label">Customers</Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}