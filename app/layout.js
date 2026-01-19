import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./globals.css";
import AuthProvider from '@/utils/AuthProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, Stack } from '@mui/material';

export const metadata = {
  title: "HSE",
  description: "Health, Safety, and Environment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AuthProvider>
            <Stack height={'100vh'}>
              {children}
            </Stack>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}
