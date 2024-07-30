import { TOKEN_TYPE } from "@/model/variable";
import Cookies from "js-cookie";

export const HEADER = {
    defaultHeader: () => ({
        accept: 'application/json',
    }),
    refreshTokenHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.REFRESH_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    protectedHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
}

export const endPoint = {
    auth: {
        login: () => ({
            url: "account/api/v1/public/auth/login",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        refreshToken: () => ({
            url: "account/api/v1/protected/auth/refresh-token",
            method: "POST",
            headers: HEADER.refreshTokenHeader(),
        }),
        register: () => ({
            url: "account/api/v1/public/auth/register",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        getTimeCodePending: () => ({
            url: "account/api/v1/public/auth/time-code-pending",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        repeatCode: () => ({
            url: "account/api/v1/public/auth/repeat-code",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        acceptCode: () => ({
            url: "account/api/v1/public/auth/accept-code",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
    },
    mess: {
        createBoxChat: () => ({
            url: "mess/api/v1/protected/create_box_chat",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        createGroupChat: () => ({
            url: "mess/api/v1/protected/create_group_chat",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        addMemberGroupChat: () => ({
            url: "mess/api/v1/protected/add_member_group_chat",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        loadMessBoxChat: () => ({
            url: "mess/api/v1/protected/box_chat_load_mess",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getBoxChat: () => ({
            url: "mess/api/v1/protected/box_chat",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getGroupChat: () => ({
            url: "mess/api/v1/protected/profile_group_chat",
            method: "GET",
            headers: HEADER.protectedHeader(),
        })
    }
}