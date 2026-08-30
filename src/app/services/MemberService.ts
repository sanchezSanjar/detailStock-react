import axios from "axios";
import { serverApi } from "../../lib/config";
import type { Member, MemberUpdateInput, LoginInput, MemberInput } from "../../lib/types/member";

class MemberService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }

    public async signup(input: MemberInput): Promise<Member> {
    try {
        const url = this.path + "/member/signup";
        const result = await axios.post(url, input, { withCredentials: true });
        return result.data.member;
    } catch (err) {
        console.log("Error, signup:", err);
        throw err;
    }
    }

    public async login(input: LoginInput): Promise<Member> {
    try {
        const url = this.path + "/member/login";
        const result = await axios.post(url, input, { withCredentials: true });
        return result.data.member;
    } catch (err) {
        console.log("Error, login:", err);
        throw err;
    }
    }

    public async logout(): Promise<void> {
    try {
        const url = this.path + "/member/logout";
        await axios.post(url, {}, { withCredentials: true });
    } catch (err) {
        console.log("Error, logout:", err);
        throw err;
    }
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