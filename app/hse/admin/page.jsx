import React from 'react'
import { Typography, Box } from '@mui/material'

const page = () => {
    return (
        <Box p={2}>
            <Typography variant="h5" fontWeight={700}>Admin Dashboard</Typography>
            <Typography color="text.secondary">Select an option from the sidebar to manage system settings.</Typography>
        </Box>
    )
}

export default page