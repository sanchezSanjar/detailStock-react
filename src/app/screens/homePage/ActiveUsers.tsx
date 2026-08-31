import { Box, Container, Stack, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import type { Member } from "../../../lib/types/member";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

const activeUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({ topUsers }));

export default function ActiveUsers() {
    const { topUsers } = useSelector(activeUsersRetriever);

    return (
        <div className={"active-users-frame"}>
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>Active Users</Box>
                    <Stack direction={"row"} sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 3 }} className={"cards-frame"}>
                        {topUsers.length !== 0 ? (
                            topUsers.map((member: Member) => {
                                const imagePath = getImageUrl(member.memberImage);
                                return (
                                    <Stack key={member._id} className={"user-card"} sx={{ alignItems: "center" }}>
                                        <Avatar src={imagePath} sx={{ width: 90, height: 90, border: "2px solid #e50914" }} />
                                        <Typography className={"user-name"}>{member.memberNick}</Typography>
                                        <Typography className={"user-points"}>{member.memberPoints ?? 0} pts</Typography>
                                    </Stack>
                                );
                            })
                        ) : (
                            <Box className="no-data">No active Users available</Box>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}