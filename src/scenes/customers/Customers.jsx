import React, { useState, useEffect } from 'react'
import { useGetCustomersQuery } from '../../state/api'
import { Box, useTheme } from '@mui/material'
import Header from '../../components/Header'
import { DataGrid } from '@mui/x-data-grid'

const Customers = () => {
    const theme = useTheme()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(true)

    const { data, isLoading, error } = useGetCustomersQuery({ page, pageSize })
    const customerData = data?.data || []
    const totalRows = data?.totalCount || 0

    useEffect(() => {
        if (!isLoading) {
            setLoading(false)
        }
    }, [isLoading, data])

    const columns = [
        // Column definitions
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
        <Box m="1.5rem 2.5rem">
            <Header title="CUSTOMERS" subtitle="List of Customers" />
            {
                data || !isLoading ? (<Box
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
                        loading={loading}  // Use the local loading state
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={customerData}
                        paginationMode='server'
                        rowCount={totalRows}
                        page={page}
                        pageSize={pageSize}
                        onPageChange={(newPage) => {
                            setLoading(true)
                            setPage(newPage);
                        }}
                        onPageSizeChange={(newPageSize) => {
                            setLoading(true)
                            setPageSize(newPageSize);
                            setPage(0);
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}
                    />
                </Box>) : (<>Loading...</>)
            }
        </Box>
    )
}

export default Customers
