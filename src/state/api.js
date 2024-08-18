import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : import.meta.env.VITE_APP_BASE_URL}),
    reducerPath : ["adminApi"],
    tagTypes : ["User", "Products", "Customers"],
    endpoints : (build) => ({
        getUser : build.query({
            query : (id) => `general/user/${id}`,
            providesTags : ["User"]
        }),
        getProducts : build.query({
            query : () => 'client/get-products',
            providesTags : ["Products"]
        }),
        getCustomers : build.query({
            query : ({page = 1, limit = 10}) => `client/get-customers?page=${page}&limit=${limit}`,
            providedTags : ["Customers"]
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery
} = api 