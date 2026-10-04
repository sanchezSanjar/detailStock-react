import { useState, type MouseEvent } from "react";
import { Stack, Box, Button, Menu, MenuItem, ListItemIcon, IconButton, Drawer } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Basket } from "../basket";
import { logout } from "../../slices/authSlice";
import MemberService from "../../services/MemberService";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

const defaultUserIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

export default function Navbar() {
    const authMember = useAppSelector((state) => state.auth.authMember);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const links = [
        { to: "/", label: "Home" },
        { to: "/products", label: "Products" },
        ...(authMember
            ? [
                { to: "/orders", label: "Orders" },
                { to: "/member-page", label: "My Page" },
            ]
            : []),
        { to: "/help", label: "Help" },
    ];

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        handleMenuClose();
        try {
            const member = new MemberService();
            await member.logout();
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(logout());
        }
    };

    const renderLinks = (onClick?: () => void) =>
        links.map((link) => (
            <Box key={link.to} className={"hover-line"}>
                <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={onClick}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                >
                    {link.label}
                </NavLink>
            </Box>
        ));

    return (
        <div className="navbar-wrapper">
            <Stack
                direction={"row"}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
                className="navbar-inner"
            >
                <Box className="logo-box">
                    <NavLink to="/">
                        <span className="logo-text">
                            DETAIL<strong>STOCK</strong>
                        </span>
                    </NavLink>
                </Box>

                <Stack
                    direction={"row"}
                    sx={{ alignItems: "center" }}
                    className="nav-links"
                >
                    <Stack direction={"row"} sx={{ alignItems: "center" }} className="nav-menu-links">
                        {renderLinks()}
                    </Stack>

                    <Basket />

                    {!authMember ? (
                        <Box className="login-box">
                            <NavLink to="/login">
                                <Button variant="contained" className="login-btn">
                                    Login
                                </Button>
                            </NavLink>
                        </Box>
                    ) : (
                        <>
                            <Box
                                className="user-avatar"
                                onClick={(e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
                                sx={{ cursor: "pointer" }}
                            >
                                <img
                                    src={getImageUrl(authMember.memberImage, defaultUserIcon)}
                                    alt="user"
                                />
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}

                    <IconButton
                        className="nav-burger"
                        aria-label="open menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Stack>
            </Stack>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                slotProps={{ paper: { className: "nav-drawer" } }}
            >
                <Box className="nav-drawer-header">
                    <IconButton aria-label="close menu" onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Stack className="nav-drawer-links">
                    {renderLinks(() => setDrawerOpen(false))}
                </Stack>
            </Drawer>
        </div>
    );
}
