import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/request/base.request";
import { BoxChatModel } from "@/model/box_chat";
import { AddMemberGroupChatReq, CreateBoxChatReq, CreateGroupChatReq } from "@/dto/request/mess";
import { GroupChatModel } from "@/model/group_chat";
import { ProfileGroupChatModel } from "@/model/profile_group_chat";
import { MessModel } from "@/model/mess";
import { ProfileModel } from "@/model/profile";

export const messApi = createApi({
    reducerPath: "messApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        createBoxChat: builder.mutation<QueryReturnType<BoxChatModel>, CreateBoxChatReq>({
            query: (payload) => ({
                ...endPoint.mess.createBoxChat(),
                data: payload,
            }),
        }),
        createGroupChat: builder.mutation<QueryReturnType<GroupChatModel>, CreateGroupChatReq>({
            query: (payload) => ({
                ...endPoint.mess.createGroupChat(),
                data: payload,
            }),
        }),
        addMemberGroupChat: builder.mutation<QueryReturnType<ProfileGroupChatModel>, AddMemberGroupChatReq>({
            query: (payload) => ({
                ...endPoint.mess.addMemberGroupChat(),
                data: payload,
            }),
        }),
        loadMessBoxChat: builder.query<QueryReturnType<MessModel[]>, { id: string }>({
            query: (payload) => ({
                ...endPoint.mess.loadMessBoxChat(),
                params: payload,
            }),
        }),
        getBoxChat: builder.query<QueryReturnType<BoxChatModel[]>, null>({
            query: () => ({
                ...endPoint.mess.getBoxChat(),
            }),
        }),
        getGroupChat: builder.query<QueryReturnType<ProfileGroupChatModel[]>, null>({
            query: () => ({
                ...endPoint.mess.getGroupChat(),
            }),
        }),
        searchProfile: builder.query<QueryReturnType<ProfileModel[]>, { name: string, email: string }>({
            query: (payload) => ({
                ...endPoint.mess.searchProfile(),
                params: payload
            }),
        })
    })
});

export const {
    useCreateBoxChatMutation,
    useCreateGroupChatMutation,
    useAddMemberGroupChatMutation,
    useGetBoxChatQuery,
    useGetGroupChatQuery,
    useLoadMessBoxChatQuery,
    useSearchProfileQuery,
} = messApi;