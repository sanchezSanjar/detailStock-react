import { Stack, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Basket } from "../basket";

export function OtherNavbar() {
    const authMember = useSelector((state: RootState) => state.auth.authMember);
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
                        <Box className="user-avatar">
                            <img src="/icons/default-user.svg" alt="user" />
                        </Box>
                    )}
                </Stack>
            </Stack>
        </div>
    );
}