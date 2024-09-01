import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Locations", "Overall Sales", "Admin", "Performance", "Dashboard"],
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
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/get-transactions",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ["Transactions"]
        }),
        getLocations: build.query({
            query: () => 'client/geography',
            providesTags: ["Locations"]
        }),
        getSales: build.query({
            query: () => 'sales/get-sales',
            providesTags: ["Overall Sales"]
        }),
        getAdmin: build.query({
            query: () => 'management/admins',
            providesTags: ["Admin"]
        }),
        getPerformance: build.query({
            query: (id) => `management/affiliate/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboardInformation: build.query({
            query: () => 'general/dashboard',
            providesTags: ["Dashboard"]
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetLocationsQuery,
    useGetSalesQuery,
    useGetAdminQuery,
    useGetPerformanceQuery,
    useGetDashboardInformationQuery ,
} = api 