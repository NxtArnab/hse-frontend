'use client';
import React, { useEffect } from 'react'
import useAuthStore from '@/store/useAuthStore';
import { Stack } from '@mui/material';
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'



const AuthProvider = ({ children }) => {
    const { verify, isAuthenticated, loading } = useAuthStore();

    useEffect(() => {
        verify();
    }, [verify])

    if (loading) {
        return (
            <Stack sx={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Trefoil
                    size="40"
                    stroke="4"
                    strokeLength="0.15"
                    bgOpacity="0.1"
                    speed="1.4"
                    color="black"
                />
            </Stack>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider