import React from 'react'
import { Typography, Box, Paper } from '@mui/material'

const Dashboard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', p: 3 }}>
            <Paper>
                <Typography>Alice Johnson</Typography>
                <Typography>ID: 001</Typography>
                <Typography>time</Typography>
                <Typography>Tapped in</Typography>
            </Paper>
        </Box>
    )
}

export default Dashboard