import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => 'client/get-products',
            providesTags: ["Products"]
        }),
        getCustomers: build.query({
            query: ({ page, limit }) => ({
                url: "client/get-customers",
                method: "GET",
                params: { page, limit }
            }),
            providesTags: ["Customers"]
        }),
        getTransactions : build.query({
            query : ({page, pageSize, sort, search}) => ({
                url : "client/get-transactions",
                method : "GET",
                params : { page, pageSize, sort, search}
            }),
            providesTags : ["Transactions"]
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery
} = api 