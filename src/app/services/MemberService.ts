import axios from "axios";
import { serverApi } from "../../lib/config";
import type { Member, MemberUpdateInput } from "../../lib/types/member";

class MemberService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }

    public async getTopUsers(): Promise<Member[]> {
    try {
        const url = this.path + "/member/top-users";
        const result = await axios.get(url);
        return result.data;
    } catch (err) {
        console.log("Error, getTopUsers:", err);
        throw err;
    }
    }

    public async getShop(): Promise<Member> {
    try {
        const url = this.path + "/member/shop";
        const result = await axios.get(url);
        return result.data;
    } catch (err) {
        console.log("Error, getShop:", err);
        throw err;
    }
    }
    public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
        const formData = new FormData();
        if (input.memberNick) formData.append("memberNick", input.memberNick);
        if (input.memberPhone) formData.append("memberPhone", input.memberPhone);
        if (input.memberAddress) formData.append("memberAddress", input.memberAddress);
        if (input.memberDesc) formData.append("memberDesc", input.memberDesc);
        if (input.memberImage instanceof File) formData.append("memberImage", input.memberImage);

        const url = this.path + "/member/update";
        const result = await axios.post(url, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return result.data;
    } catch (err) {
        console.log("Error, updateMember:", err);
        throw err;
    }
}
}

export default MemberService;