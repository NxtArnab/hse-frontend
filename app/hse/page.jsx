'use client';

import React, { useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import {
    Box,
    Button,
    Stack,
    Typography,
    Tab,
    Tabs,
    Paper,
} from '@mui/material';
import { Add, Assignment, AssignmentInd } from '@mui/icons-material';
import IncidentTable from './(components)/IncidentTable';
import IncidentKPIPanel from './(components)/IncidentKPIPanel';
import Link from 'next/link';

const Page = () => {
    const { user } = useAuthStore();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Stack spacing={2} flex={1} sx={{ height: '100%', overflow: 'hidden', p: 2 }}>
            {/* Header */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={'center'}
                spacing={2}
                sx={{ flexShrink: 0 }}
            >
                <Box>
                    <Typography fontWeight={600} fontSize={'1.2rem'} sx={{ color: '#1f2937' }}>
                        Incidents
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage and track safety incidents across your organization.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    LinkComponent={Link}
                    href="/hse/create"
                    startIcon={<Add />}
                    size='small'
                    sx={{
                        fontWeight: 500,
                        textTransform: 'none',
                    }}
                >
                    Create New Incident
                </Button>
            </Stack>

            {/* Main Content Area */}
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
                {/* Left Side: Filters and Table */}
                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="incident tabs"
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    minHeight: 48,
                                }
                            }}
                        >
                            <Tab
                                icon={<AssignmentInd fontSize="small" />}
                                iconPosition="start"
                                label="My Requests"
                            />
                            <Tab
                                icon={<Assignment fontSize="small" />}
                                iconPosition="start"
                                label="All Requests"
                            />
                        </Tabs>
                    </Box>

                    <Box sx={{ flex: 1, p: 1, overflow: 'hidden' }}>
                        <IncidentTable filter={tabValue === 0 ? 'my' : 'all'} />
                    </Box>
                </Paper>

                {/* Right Side: KPI Panel */}
                <Box sx={{ width: { xs: '100%', lg: 320 }, flexShrink: 0 }}>
                    <IncidentKPIPanel />
                </Box>
            </Stack>
        </Stack>
    );
};

export default Page;
