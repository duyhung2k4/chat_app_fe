import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/request/base.request";
import { AuthResponse, GetTimeCodePedingResponse } from "@/dto/response/auth.response";
import { GetTimeCodePedingRequest, RegisterRequest } from "@/dto/request/auth.request";
import { ROLE_APP } from "@/model/variable";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<QueryReturnType<AuthResponse>, RegisterRequest>({
            query: (payload) => ({
                ...endPoint.auth.login(),
                data: {
                    ...payload,
                    role: ROLE_APP,
                },
            }),
        }),
        refreshToken: builder.mutation<QueryReturnType<AuthResponse>, null>({
            query: (payload) => ({
                ...endPoint.auth.refreshToken(),
                data: payload,
            }),
        }),
        register: builder.mutation<QueryReturnType<AuthResponse>, RegisterRequest>({
            query: (payload) => ({
                ...endPoint.auth.register(),
                data: payload,
            }),
        }),
        getTimeCodePending: builder.query<QueryReturnType<GetTimeCodePedingResponse>, GetTimeCodePedingRequest>({
            query: (payload) => ({
                ...endPoint.auth.getTimeCodePending(),
                params: payload,
            }),
        })
    })
});

export const {
    useLoginMutation,
    useRefreshTokenMutation,
    useRegisterMutation,
    useGetTimeCodePendingQuery,
} = authApi;