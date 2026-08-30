import { useState, type KeyboardEvent } from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { LoginInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { setAuthMember } from "../../slices/authSlice";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import "../../css/auth.css";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [memberNick, setMemberNick] = useState("");
    const [memberPassword, setMemberPassword] = useState("");

    const handleLogin = async () => {
        try {
            if (!memberNick || !memberPassword) {
                throw new Error("Please fill out all fields!");
            }
            const input: LoginInput = { memberNick, memberPassword };
            const member = new MemberService();
            const result = await member.login(input);
            dispatch(setAuthMember(result));
            navigate("/");
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className={"auth-page"}>
            <Container maxWidth={"xs"}>
                <Stack className={"auth-frame"}>
                    <Typography className={"auth-title"}>Enter</Typography>
                    <Typography className={"auth-subtext"}>
                        Not registered yet? <NavLink to="/signup">Signup</NavLink>
                    </Typography>

                    <Box className={"auth-input-group"}>
                        <label>Username</label>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Username"
                            value={memberNick}
                            onChange={(e) => setMemberNick(e.target.value)}
                        />
                    </Box>

                    <Box className={"auth-input-group"}>
                        <label>Password</label>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            placeholder="Password"
                            value={memberPassword}
                            onChange={(e) => setMemberPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </Box>

                    <Button variant="contained" className={"auth-btn"} onClick={handleLogin}>
                        Login
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}