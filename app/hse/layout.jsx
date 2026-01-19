'use client';

import useAuthStore from "@/store/useAuthStore";
import { Box, Stack } from "@mui/material";
import { redirect } from "next/navigation";
import Appbar from "./(components)/Appbar";

const Layout = ({ children }) => {

    const { isAuthenticated } = useAuthStore()

    if (!isAuthenticated) {
        return redirect('/auth/login')
    }
    return (
        <Stack flex={1} minHeight={0}>
            <Appbar />
            <Stack flex={1}>
                {children}
            </Stack>
        </Stack>
    );
}

export default Layout