import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";


export function Footer() {
    return (
        <div className="footer-section">
            <Container maxWidth={false} className="footer-content">
                <Stack direction={"row"} sx={{ justifyContent: "space-between" }} className="footer-top">

                    <Box className="footer-brand">
                        <Typography className="footer-logo">DetailStock</Typography>
                        <Typography className="footer-desc">
                            Focusing on premium car detailing products,
                            DetailStock brings professional-grade care
                            to every driveway. Clean. Protect. Perform.
                        </Typography>
                        <Stack direction={"row"} className="footer-socials">
                            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                            <a href="#" aria-label="X"><XIcon /></a>
                            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                            <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
                        </Stack>
                    </Box>

                    <Box className="footer-links">
                        <Typography className="footer-heading">Fields</Typography>
                        <NavLink to="/" className="footer-link">Home</NavLink>
                        <NavLink to="/products" className="footer-link">Products</NavLink>
                        <NavLink to="/help" className="footer-link">Help</NavLink>
                    </Box>

                    <Box className="footer-contact">
                        <Typography className="footer-heading">Contact Us</Typography>
                        <Typography className="footer-line">
                            <strong>L.</strong> Daegu, Dalseo-gu
                        </Typography>
                        <Typography className="footer-line">
                            <strong>P.</strong> 010-1234-5678
                        </Typography>
                        <Typography className="footer-line">
                            <strong>E.</strong> sanjarbek98@bk.ru
                        </Typography>
                        <Typography className="footer-line">
                            <strong>H.</strong> Visit 24/7
                        </Typography>
                    </Box>

                </Stack>

                <Divider className="footer-divider" />

                <Typography className="footer-copyright">
                    © Copyright DetailStock. All rights reserved.
                </Typography>

            </Container>
        </div>
    );
}