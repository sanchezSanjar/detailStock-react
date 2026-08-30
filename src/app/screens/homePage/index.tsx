import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useCountUp } from "../../hooks/useCountUp";

export function HomePage() {
    const shopsCount = useCountUp(12);
    const feedbacksCount = useCountUp(8);
    const productsCount = useCountUp(50);
    const customersCount = useCountUp(200);

    return (
        <div className="home-page">
            <div className="hero-section">
                <Container maxWidth={false} className="hero-content">
                    <Stack className="hero-text">
                        <Typography className="hero-title">
                            World's Best Detailing<br />Products For Your Car
                        </Typography>
                        <Typography className="hero-subtitle">
                            Your choice decides your status.
                        </Typography>
                        <Typography className="hero-service">
                            Service 24/7
                        </Typography>
                        <Box className="hero-cta">
                            <NavLink to="/signup">
                                <Button variant="contained" className="signup-btn">
                                    SIGN UP
                                </Button>
                            </NavLink>
                        </Box>
                    </Stack>
                </Container>

                <div className="stats-bar">
                    <Stack direction={"row"} sx={{ justifyContent: "space-around", alignItems: "center" }}>
                        <Box className="stat-item">
                            <Typography className="stat-number">{shopsCount}</Typography>
                            <Typography className="stat-label">Shops</Typography>
                        </Box>
                        <div className="stat-divider" />
                        <Box className="stat-item">
                            <Typography className="stat-number">{feedbacksCount}</Typography>
                            <Typography className="stat-label">Feedbacks</Typography>
                        </Box>
                        <div className="stat-divider" />
                        <Box className="stat-item">
                            <Typography className="stat-number">{productsCount}+</Typography>
                            <Typography className="stat-label">Products</Typography>
                        </Box>
                        <div className="stat-divider" />
                        <Box className="stat-item">
                            <Typography className="stat-number">{customersCount}+</Typography>
                            <Typography className="stat-label">Customers</Typography>
                        </Box>
                    </Stack>
                </div>
            </div>
        </div>
    );
}