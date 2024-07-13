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
            url: "account/api/v1/protected/refresh-token",
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
        })
    },
    shop: {
        getShop: () => ({
            url: "shop/api/v1/protected/shop",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getDetailShop: () => ({
            url: "shop/api/v1/protected/shop/get-detail-shop",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        createShop: () => ({
            url: "shop/api/v1/protected/shop",
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
        checkDuplicate: () => ({
            url: "shop/api/v1/protected/shop/check-duplicate",
            method: "GET",
            headers: HEADER.protectedHeader(),
        })
    },
    typeProduct: {
        getTypeProduct: () => ({
            url: "shop/api/v1/protected/type-product",
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        getCategory: () => ({
            url: "shop/api/v1/public/type-product/category",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
        createTypeProduct: () => ({
            url: "shop/api/v1/protected/type-product",
            method: "POST",
            headers: HEADER.protectedHeader(),
        })
    },
    product: {
        createProduct: () => ({
            url: "product/api/v1/protected/product",
            method: "POST",
            headers: HEADER.protectedHeader(),
        })
    }
}