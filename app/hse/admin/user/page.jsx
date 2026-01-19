import { Box, Typography } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <Box p={2}>
            <Typography variant="h5" fontWeight={700}>User Management</Typography>
            <Typography color="text.secondary">Manage user accounts and permissions.</Typography>
        </Box>
    )
}

export default page