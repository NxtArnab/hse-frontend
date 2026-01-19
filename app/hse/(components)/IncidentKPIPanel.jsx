'use client';

import React from 'react';
import { Box, Card, Stack, Typography, LinearProgress, Divider } from '@mui/material';
import { Warning, ThumbDown, TrendingUp, CheckCircle } from '@mui/icons-material';

const KPIItem = ({ icon: Icon, color, title, value, subtext }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
            sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Icon fontSize="small" />
        </Box>
        <Box flex={1}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {title}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, my: 0.5 }}>
                {value}
            </Typography>
            {subtext && (
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {subtext}
                </Typography>
            )}
        </Box>
    </Stack>
);

const IncidentKPIPanel = () => {
    return (
        <Card
            elevation={0}
            sx={{
                p: 2.5,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                height: '100%',
                bgcolor: '#ffffff'
            }}
        >
            <Stack spacing={3}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#1f2937' }}>
                        Quick Stats
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Last 30 Days
                    </Typography>
                </Box>

                <Stack spacing={2.5}>
                    <KPIItem
                        icon={Warning}
                        color="#d32f2f" // Error red
                        title="Critical Incidents"
                        value="3"
                        subtext="+1 from last week"
                    />

                    <Divider flexItem />

                    <KPIItem
                        icon={ThumbDown}
                        color="#ed6c02" // Warning orange
                        title="Open High Severity"
                        value="8"
                        subtext="Requires immediate attention"
                    />

                    <Divider flexItem />

                    <KPIItem
                        icon={CheckCircle}
                        color="#2e7d32" // Success green
                        title="Resolved This Week"
                        value="12"
                        subtext="92% within SLA"
                    />
                </Stack>

                <Box sx={{ pt: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="caption" fontWeight={600} color="text.secondary">
                            Resolution Goal
                        </Typography>
                        <Typography variant="caption" fontWeight={700} color="#1976d2">
                            85%
                        </Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={85}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: '#e3f2fd',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: '#1976d2'
                            }
                        }}
                    />
                </Box>
            </Stack>
        </Card>
    );
};

export default IncidentKPIPanel;
