import React from 'react'
import { GridColumnMenuContainer, GridFilterMenuItem, HideGridColMenuItem } from '@mui/x-data-grid'


const CustomeColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props
    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    )
}

export default CustomeColumnMenu
