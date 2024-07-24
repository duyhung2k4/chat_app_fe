import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/request/base.request";
import { AuthResponse, GetTimeCodePedingResponse } from "@/dto/response/auth.response";
import { AcceptCodeRequest, GetTimeCodePedingRequest, LoginRequest, RegisterRequest, RepeatCodeRequest } from "@/dto/request/auth.request";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<QueryReturnType<AuthResponse>, LoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.login(),
                data: payload,
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
        }),
        repeatCode: builder.mutation<QueryReturnType<null>, RepeatCodeRequest>({
            query: (payload) => ({
                ...endPoint.auth.repeatCode(),
                data: payload,
            }),
        }),
        acceptCode: builder.mutation<QueryReturnType<any>, AcceptCodeRequest>({
            query: (payload) => ({
                ...endPoint.auth.acceptCode(),
                data: payload,
            }),
        })
    })
});

export const {
    useGetTimeCodePendingQuery,

    useLoginMutation,
    useRefreshTokenMutation,
    useRegisterMutation,
    useAcceptCodeMutation,
    useRepeatCodeMutation,
} = authApi;