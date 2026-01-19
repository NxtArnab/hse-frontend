'use client';

import React from 'react';
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { People, Category } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }) => {
    const pathname = usePathname();

    const menuItems = [
        { text: 'Users', icon: <People />, href: '/hse/admin/user' },
        { text: 'Incident Types', icon: <Category />, href: '/hse/admin/incident-type' },
    ];

    return (
        <Stack direction="row" flex={1}>
            <Box
                sx={{
                    width: 240,
                    bgcolor: 'white',
                    borderRight: '1px solid #e8eaed',
                    borderColor: 'divider',
                }}
            >
                <Box px={2} py={2}>
                    <Typography variant="overline" fontWeight={700} color="text.secondary">
                        Admin Panel
                    </Typography>
                </Box>
                <Divider />
                <List sx={{ p: 1 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                selected={pathname === item.href}
                                sx={{
                                    borderRadius: 1.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: pathname === item.href ? 'inherit' : 'primary.main' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Admin Content Area */}
            <Box flex={1}>
                {children}
            </Box>
        </Stack>
    );
};

export default AdminLayout;
