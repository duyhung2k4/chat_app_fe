import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { QueryReturnType } from "@/dto/request/base.request";
import { TypeProductModel } from "@/model/typeProduct";
import { endPoint } from "../query/endpoint";
import { TypeProductRequest } from "@/dto/request/typeProduct";
import { CategoryModel } from "@/model/category";

export const typeProductApi = createApi({
    reducerPath: "typeProductApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getTypeProduct: builder.query<QueryReturnType<TypeProductModel[]>, number>({
            query: (payload) => ({
                ...endPoint.typeProduct.getTypeProduct(),
                params: {
                    shopId: payload,
                }
            })
        }),
        getCategory: builder.query<QueryReturnType<CategoryModel[]>, null>({
            query: () => ({
                ...endPoint.typeProduct.getCategory(),
            })
        }),
        createTypeProduct: builder.mutation<QueryReturnType<TypeProductModel>, TypeProductRequest>({
            query: (payload) => ({
                ...endPoint.typeProduct.createTypeProduct(),
                data: payload,
            })
        })
    }),
});

export const {
    useCreateTypeProductMutation,
    useGetTypeProductQuery,
    useGetCategoryQuery,
} = typeProductApi