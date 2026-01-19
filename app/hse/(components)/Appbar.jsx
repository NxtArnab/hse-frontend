'use client';

import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Stack,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    alpha
} from '@mui/material';
import {
    Security,
    Logout,
    Settings,
    Person,
    KeyboardArrowDown
} from '@mui/icons-material';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Appbar = () => {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
        router.push('/');
    };

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            sx={{
                bgcolor: alpha('#ffffff', 0.8),
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #e8eaed',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left side: Logo and Title */}
                <Stack component={Link} href="/hse" direction="row" alignItems="center" spacing={1.5}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: '#1976d2',
                            borderRadius: 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}
                    >
                        <Security sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography
                        variant="h7"
                        fontWeight={500}
                    >
                        HSE Manager
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                            Welcome back,
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ color: 'text.primary' }}>
                            {user?.name || 'User'}
                        </Typography>
                    </Box>

                    <IconButton size='small'>
                        <Avatar
                            onClick={handleClick}
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: alpha('#1976d2', 0.1),
                                color: '#1976d2',
                                fontWeight: 700,
                                fontSize: '0.875rem'
                            }}
                        >
                            {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                    </IconButton>
                </Stack>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                            mt: 1.5,
                            minWidth: 180,
                            borderRadius: 2,
                            border: '1px solid #e8eaed',

                        },
                    }}
                >

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                        router.push('/hse/admin');
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        Admin Panel
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        <ListItemIcon>
                            <Logout fontSize="small" color="error" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
