import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/request/base.request";
import { ShopModel } from "@/model/shop";
import { ShopCheckDuplicateParams, ShopRequest } from "@/dto/request/shop";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getShop: builder.query<QueryReturnType<ShopModel[]>, null>({
            query: () => ({
                ...endPoint.shop.getShop(),
            })
        }),
        getDetailShop: builder.query<QueryReturnType<ShopModel>, number>({
            query: (payload) => ({
                ...endPoint.shop.getDetailShop(),
                params: {
                    shopId: payload,
                }
            })
        }),
        createShop: builder.mutation<QueryReturnType<ShopModel>, ShopRequest>({
            query: (payload) => ({
                ...endPoint.shop.createShop(),
                data: payload,
            }),
        }),
        checkDuplicate: builder.query<QueryReturnType<boolean>, ShopCheckDuplicateParams>({
            query: (payload) => ({
                ...endPoint.shop.checkDuplicate(),
                params: payload,
            }),
        }),
    })
});

export const {
    useCreateShopMutation,
    useCheckDuplicateQuery,
    useGetShopQuery,
    useGetDetailShopQuery,
} = shopApi;