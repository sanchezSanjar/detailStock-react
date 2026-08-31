import { useState, type KeyboardEvent } from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { MemberInput } from "../../../lib/types/member";
import { MemberType } from "../../../lib/enums/member.enum";
import MemberService from "../../services/MemberService";
import { setAuthMember } from "../../slices/authSlice";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import "../../css/auth.css";

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [memberNick, setMemberNick] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        try {
            if (!memberNick || !memberPhone || !memberPassword || !confirmPassword) {
                throw new Error("Please fill out all fields!");
            }
            if (memberPassword !== confirmPassword) {
                throw new Error("Passwords do not match!");
            }

            const input: MemberInput = {
                memberNick,
                memberPhone,
                memberPassword,
                memberType: MemberType.USER,
            };

            const member = new MemberService();
            const result = await member.signup(input);
            dispatch(setAuthMember(result));
            navigate("/");
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleSignup();
    };

    return (
        <div className={"auth-page"}>
            <Container maxWidth={"sm"}>
                <Stack className={"auth-frame"}>
                    <Typography className={"auth-title"}>Signup</Typography>
                    <Typography className={"auth-subtext"}>
                        Go back <NavLink to="/">HOME</NavLink>
                    </Typography>
                    <Typography className={"auth-subtext"}>
                        Already signed up? <NavLink to="/login">LOGIN</NavLink>
                    </Typography>

                    <Stack direction={"row"} className={"auth-row"}>
                        <Box className={"auth-input-group"}>
                            <label>Username *</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Username"
                                value={memberNick}
                                onChange={(e) => setMemberNick(e.target.value)}
                            />
                        </Box>
                        <Box className={"auth-input-group"}>
                            <label>Phone *</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Phone"
                                value={memberPhone}
                                onChange={(e) => setMemberPhone(e.target.value)}
                            />
                        </Box>
                    </Stack>

                    <Stack direction={"row"} className={"auth-row"}>
                        <Box className={"auth-input-group"}>
                            <label>Password *</label>
                            <TextField
                                fullWidth
                                type="password"
                                variant="outlined"
                                placeholder="Password"
                                value={memberPassword}
                                onChange={(e) => setMemberPassword(e.target.value)}
                            />
                        </Box>
                        <Box className={"auth-input-group"}>
                            <label>Repeat password *</label>
                            <TextField
                                fullWidth
                                type="password"
                                variant="outlined"
                                placeholder="Repeat password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Box>
                    </Stack>

                    <Button variant="contained" className={"auth-btn"} onClick={handleSignup}>
                        Signup
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}