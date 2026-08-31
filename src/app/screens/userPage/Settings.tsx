import { Box, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { MemberUpdateInput } from "../../../lib/types/member";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberService from "../../services/MemberService";
import { setAuthMember } from "../../slices/authSlice";
import type { RootState } from "../../store";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

export function Settings() {
    const dispatch = useDispatch();
    const authMember = useSelector((state: RootState) => state.auth.authMember);

    const [memberImagePreview, setMemberImagePreview] = useState<string>(
        getImageUrl(authMember?.memberImage)
    );
    const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
        memberNick: authMember?.memberNick,
        memberPhone: authMember?.memberPhone,
        memberAddress: authMember?.memberAddress,
        memberDesc: authMember?.memberDesc,
    });

    const handleChange = (field: keyof MemberUpdateInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMemberUpdateInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmitButton = async () => {
        try {
            if (!memberUpdateInput.memberNick || !memberUpdateInput.memberPhone) {
                throw new Error("Please fill out all required fields!");
            }
            const member = new MemberService();
            const result = await member.updateMember(memberUpdateInput);
            dispatch(setAuthMember(result));
            await sweetTopSmallSuccessAlert("Modified successfully!", 700);
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const handleImageViewer = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpg", "image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            sweetErrorHandling(new Error("Only JPG, JPEG, PNG formats are allowed!")).then();
            return;
        }

        setMemberUpdateInput((prev) => ({ ...prev, memberImage: file }));
        setMemberImagePreview(URL.createObjectURL(file));
    };

    return (
        <Box className={"settings"}>
            <Box className={"member-media-frame"}>
                <img src={memberImagePreview} className={"mb-image"} alt="" />
                <div className={"media-change-box"}>
                    <span>Upload image</span>
                    <p>JPG, JPEG, PNG formats only!</p>
                    <div className={"up-del-box"}>
                        <Button component="label">
                            <CloudDownloadIcon />
                            <input type="file" hidden onChange={handleImageViewer} />
                        </Button>
                    </div>
                </div>
            </Box>

            <Box className={"input-frame"}>
                <div className={"long-input"}>
                    <label className={"spec-label"}>Username</label>
                    <input
                        className={"spec-input mb-nick"}
                        type="text"
                        value={memberUpdateInput.memberNick ?? ""}
                        name="memberNick"
                        onChange={handleChange("memberNick")}
                    />
                </div>
            </Box>

            <Box className={"input-frame"}>
                <div className={"short-input"}>
                    <label className={"spec-label"}>Phone</label>
                    <input
                        className={"spec-input mb-phone"}
                        type="text"
                        value={memberUpdateInput.memberPhone ?? ""}
                        name="memberPhone"
                        onChange={handleChange("memberPhone")}
                    />
                </div>
                <div className={"short-input"}>
                    <label className={"spec-label"}>Address</label>
                    <input
                        className={"spec-input mb-address"}
                        type="text"
                        value={memberUpdateInput.memberAddress ?? ""}
                        name="memberAddress"
                        onChange={handleChange("memberAddress")}
                    />
                </div>
            </Box>

            <Box className={"input-frame"}>
                <div className={"long-input"}>
                    <label className={"spec-label"}>Description</label>
                    <textarea
                        className={"spec-textarea mb-description"}
                        value={memberUpdateInput.memberDesc ?? ""}
                        name="memberDesc"
                        onChange={handleChange("memberDesc")}
                    />
                </div>
            </Box>

            <Box className={"save-box"}>
                <Button variant={"contained"} onClick={handleSubmitButton}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}