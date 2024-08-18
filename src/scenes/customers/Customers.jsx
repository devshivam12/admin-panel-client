import React, { useState } from 'react'
import { useGetCustomersQuery } from '../../state/api'
import { Box, useTheme } from '@mui/material'
import Header from '../../components/Header'
import { DataGrid } from '@mui/x-data-grid'

const Customers = () => {
    const theme = useTheme()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const { data, isLoading, error } = useGetCustomersQuery({ page: page + 1, limit: pageSize })
    const customerData = data?.data || []
    const totalRows = data?.totalCount || 0

    console.log("API Parameters:", { page: page + 1, limit: pageSize });
    // Debugging logs
    console.log("Page:", page)
    console.log("Page Size:", pageSize)
    console.log("Data:", customerData)
    console.log("Total Rows:", totalRows)
    console.log("Error:", error)

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        }
    ]

    return (
        <Box
            m="1.5rem 2.5rem"
        >
            <Header title="CUSTOMERS" subtitle="List of Customers" />
            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !customerData}
                    getRowId={(row) => row._id}
                    columns={columns}
                    rows={customerData}
                    paginationMode='server'
                    rowCount={totalRows}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={(newPage) => {
                        console.log("Page changed to:", newPage); // Debug log
                        setPage(newPage);
                    }}
                    onPageSizeChange={(newPageSize) => {
                        console.log("Page size changed to:", newPageSize); // Debug log
                        setPageSize(newPageSize);
                        setPage(0); // Reset to first page on pageSize change
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Box>
        </Box>
    )
}

export default Customers
