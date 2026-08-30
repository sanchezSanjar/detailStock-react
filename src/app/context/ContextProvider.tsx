import { type ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../components/hooks/useGlobals";
import type { Member } from "../../lib/types/member";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const cookies = new Cookies();
    if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

    const [authMember, setAuthMemberState] = useState<Member | null>(
        localStorage.getItem("memberData")
            ? JSON.parse(localStorage.getItem("memberData") as string)
            : null
    );
    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

    const setAuthMember = (member: Member | null) => {
        if (member) {
            localStorage.setItem("memberData", JSON.stringify(member));
        } else {
            localStorage.removeItem("memberData");
        }
        setAuthMemberState(member);
    };

    return (
        <GlobalContext.Provider value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextProvider;