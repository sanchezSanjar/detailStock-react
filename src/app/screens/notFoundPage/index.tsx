import { Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <Container>
            <Stack sx={{ alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2, textAlign: "center" }}>
                <Typography sx={{ fontSize: { xs: 64, md: 96 }, fontWeight: 800, color: "#e50914" }}>404</Typography>
                <Typography sx={{ fontSize: { xs: 18, md: 22 }, color: "#fff" }}>
                    The page you are looking for does not exist.
                </Typography>
                <NavLink to="/">
                    <Button variant="contained">Back to Home</Button>
                </NavLink>
            </Stack>
        </Container>
    );
}
