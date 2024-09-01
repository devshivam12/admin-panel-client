
import { Box, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetTransactionsQuery } from '../../state/api'
import Header from '../../components/Header'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomeToolbar from '../../components/DataGridCustomeToolbar'

const Transactions = () => {
  const theme = useTheme()
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState("")

  const [loader, setLoader] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })

  useEffect(() => {
    if (!isLoading) {
      setLoader(false)
    }
  }, [isLoading, data])

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    // {
    //   field : "product_name",
    //   headerName : "Product_Name",
    //   flex : 1.5,
    //   sortable : false,
    //   renderCell : (params) => {
    //     const products = Array.isArray(params.value) ? params.value : []
    //     const productNames = products.filter(product => product && product.name).map(product => product.name).join(", ");
    //     return productNames || "No Products"
    //   }
    // },
    {
      field: "cost",
      headerName: "Cost",
      flex: .7,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
  ]

  return (
    <Box
      m='1.5rem 2.5rem'
    >
      <Header
        title="TRANSACTIONS"
        subtitle="Entire list of transactions"
      />
      {data || !isLoading ? (
        <Box
          height="80vh"
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
            loading={loader}
            getRowId={(row) => row._id}
            rows={(data && data.transactionWithProducts) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page - 1}
            pageSize={pageSize}
            paginationMode='server'
            sortingMode='server'
            onPageChange={(newPage) => {
              setPage(newPage + 1)
              setLoader(true)
            }}
            onPageSizeChange={(newPageSize) => {
              setPageSize(newPageSize)
              setLoader(true)
            }}
            onSortModelChange={(newSortModel) => {
              setSort(...newSortModel)
              setLoader(true)
            }}
            components={{ Toolbar: DataGridCustomeToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch }
            }}
          />
        </Box>
      ) : (<>Loading...</>)}
    </Box>
  )
}

export default Transactions
