import { Box, Typography } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <Box p={2}>
            <Typography variant="h5" fontWeight={700}>Incident Type Management</Typography>
            <Typography color="text.secondary">Manage incident types and their properties.</Typography>
        </Box>
    )
}

export default page