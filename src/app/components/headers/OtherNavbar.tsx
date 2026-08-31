import { Stack, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { Basket } from "../basket";
import { logout } from "../../slices/authSlice";
import MemberService from "../../services/MemberService";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

const defaultUserIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

export function OtherNavbar() {
    const authMember = useSelector((state: RootState) => state.auth.authMember);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const member = new MemberService();
            await member.logout();
            dispatch(logout());
        } catch (err) {
            console.log(err);
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
                        <Box className="user-avatar" onClick={handleLogout} sx={{ cursor: "pointer" }}>
                            <img
                                src={getImageUrl(authMember.memberImage, defaultUserIcon)}
                                alt="user"
                            />
                        </Box>
                    )}
                </Stack>
            </Stack>
        </div>
    );
}