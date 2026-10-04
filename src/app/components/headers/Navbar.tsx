import { useState, type MouseEvent } from "react";
import { Stack, Box, Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { Basket } from "../basket";
import { logout } from "../../slices/authSlice";
import MemberService from "../../services/MemberService";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

const defaultUserIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

export default function Navbar() {
    const authMember = useSelector((state: RootState) => state.auth.authMember);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClose = () => setAnchorEl(null);

    const handleMyPage = () => {
        handleMenuClose();
        navigate("/member-page");
    };

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
                    <Box className={"hover-line"}>
                        <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
                    </Box>
                    <Box className={"hover-line"}>
                        <NavLink to="/products" className={({ isActive }) => isActive ? "underline" : ""}>Products</NavLink>
                    </Box>
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink to="/orders" className={({ isActive }) => isActive ? "underline" : ""}>Orders</NavLink>
                        </Box>
                    ) : null}
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink to="/member-page" className={({ isActive }) => isActive ? "underline" : ""}>My Page</NavLink>
                        </Box>
                    ) : null}
                    <Box className={"hover-line"}>
                        <NavLink to="/help" className={({ isActive }) => isActive ? "underline" : ""}>Help</NavLink>
                    </Box>

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
                                <MenuItem onClick={handleMyPage}>
                                    <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                                    My Page
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Stack>
            </Stack>
        </div>
    );
}