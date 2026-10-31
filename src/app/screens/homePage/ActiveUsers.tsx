import { createSelector } from "@reduxjs/toolkit";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useAppSelector } from "../../hooks";
import { retrieveTopUsers } from "./selector";
import type { Member } from "../../../lib/types/member";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const activeUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({ topUsers }));

/** leaderboard of the members with the most points (1 point per confirmed order) */
export default function ActiveUsers() {
    const { topUsers } = useAppSelector(activeUsersRetriever);
    const maxPoints = Math.max(1, ...topUsers.map((member: Member) => member.memberPoints ?? 0));

    return (
        <Reveal className="home-band">
            <div className="home-wrap">
                <SectionHeader
                    eyebrow="Community"
                    title="Top members"
                    subtitle="Every confirmed order earns a point. These are our most loyal detailers."
                />
                {topUsers.length === 0 ? (
                    <div className="home-empty">No active members yet</div>
                ) : (
                    <div className="member-grid">
                        {topUsers.map((member: Member, index: number) => {
                            const points = member.memberPoints ?? 0;
                            return (
                                <div key={member._id} className={`member-card ${index === 0 ? "is-leader" : ""}`}>
                                    <span className="member-rank">#{index + 1}</span>
                                    {index === 0 && <EmojiEventsOutlinedIcon className="member-trophy" />}
                                    <div className="member-avatar">
                                        <img src={getImageUrl(member.memberImage)} alt={member.memberNick} />
                                    </div>
                                    <span className="member-name">{member.memberNick}</span>
                                    <span className="member-points">
                                        <strong>{points}</strong> pts
                                    </span>
                                    <span className="member-bar">
                                        <span style={{ width: `${(points / maxPoints) * 100}%` }} />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Reveal>
    );
}
