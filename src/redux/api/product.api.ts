import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { QueryReturnType } from "@/dto/request/base.request";
import { endPoint } from "../query/endpoint";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        createProduct: builder.mutation<QueryReturnType<Record<string, any>>, Record<string, any>>({
            query: (payload) => ({
                ...endPoint.product.createProduct(),
                data: payload,
            }),
        }),
    })
});

export const {
    useCreateProductMutation
} = productApi;