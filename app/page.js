'use client';

import React from 'react';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';
import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  alpha,
} from '@mui/material';
import {
  Security,
  TrendingUp,
  CheckCircleOutline,
  AutoGraph,
  Business,
  Construction,
  Factory,
  HealthAndSafety
} from '@mui/icons-material';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Stack
      sx={{
        flex: 1,
        bgcolor: '#fafbfc',
        position: 'relative',
        minHeight: '100vh',
        // Light Grid Background
        backgroundImage: `
          linear-gradient(#e8eaed 1px, transparent 1px),
          linear-gradient(90deg, #e8eaed 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent, #fafbfc 85%)',
          pointerEvents: 'none',
        }
      }}
    >
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
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1, justifyContent: 'space-between' }}>
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
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
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                }}
              >
                <Security sx={{ fontSize: 20 }} />
              </Box>
              <Typography variant="h6" fontWeight={800} sx={{ color: '#202124', letterSpacing: -0.5 }}>
                HSE
              </Typography>
            </Stack>

            {/* Auth Buttons */}
            <Stack direction="row" alignItems={'center'} spacing={3}>
              {isAuthenticated ? (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Logged in as <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>{user?.name || 'User'}</Box>
                </Typography>
              ) : (
                <Button
                  component={Link}
                  href="/auth/login"
                  size='small'
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#5f6368',
                    '&:hover': { bgcolor: 'transparent', color: '#1976d2' }
                  }}
                >
                  Log In
                </Button>
              )}
              <Button
                component={Link}
                href={isAuthenticated ? '/hse' : '/auth/login'}
                variant="contained"
                disableElevation
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' }
                }}
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 8, md: 15 }, position: 'relative', zIndex: 1 }} >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box xs={12} lg={7}>
            <Stack alignItems="flex-start" spacing={4}>
              <Box
                sx={{
                  px: 2,
                  py: 0.8,
                  bgcolor: alpha('#1976d2', 0.08),
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: alpha('#1976d2', 0.15),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box sx={{ width: 6, height: 6, bgcolor: '#1976d2', borderRadius: '50%' }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#1976d2',
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase'
                  }}
                >
                  Smarter Safety Compliance
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '4.2rem' },
                  lineHeight: 1.05,
                  color: '#202124',
                  letterSpacing: -1.5
                }}
              >
                The Platform for <br />
                <Box component="span" sx={{ color: '#1976d2' }}>Modern Safety</Box>
              </Typography>

              <Typography
                sx={{
                  color: '#5f6368',
                  fontWeight: 400,
                  fontSize: '1rem',
                  maxWidth: 600,
                }}
              >
                Simplify HSE compliance with automated reports, real-time safety data, and actionable AI-driven insights.
                Protect your team and assets with professional-grade software.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                <Button
                  component={Link}
                  href={isAuthenticated ? '/hse' : '/auth/login'}
                  variant="contained"
                  size="large"
                  disableElevation
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
                  }}
                >
                  {isAuthenticated ? 'Open Dashboard' : 'Get Started Now'}
                </Button>

              </Stack>

              <Stack direction="row" spacing={5} sx={{ pt: 4 }}>
                {[
                  { label: 'Cloud-Native', icon: <CheckCircleOutline sx={{ color: '#34a853', fontSize: 18 }} /> },
                  { label: 'ISO Certified', icon: <CheckCircleOutline sx={{ color: '#34a853', fontSize: 18 }} /> },
                  { label: 'EHS Ready', icon: <CheckCircleOutline sx={{ color: '#34a853', fontSize: 18 }} /> }
                ].map((item, idx) => (
                  <Stack key={idx} direction="row" spacing={1} alignItems="center">
                    {item.icon}
                    <Typography variant="body2" sx={{ color: '#5f6368', fontWeight: 600 }}>{item.label}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Grid item xs={12} lg={5} >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                perspective: '1000px'
              }}
            >
              <Stack spacing={4} sx={{ width: '100%', maxWidth: 420 }}>
                {/* Weekly Compliance Card */}
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 5,
                    border: '1px solid #e8eaed',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                    background: alpha('#ffffff', 0.95),
                    backdropFilter: 'blur(20px)',
                    transform: 'rotateX(5deg) rotateY(-5deg)',
                    transition: 'transform 0.4s ease',
                    '&:hover': {
                      transform: 'rotateX(0deg) rotateY(0deg) translateY(-8px)'
                    }
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight={800} color="#5f6368">SITE COMPLIANCE</Typography>
                    <TrendingUp sx={{ color: '#34a853' }} />
                  </Stack>
                  <Typography variant="h3" fontWeight={900} color="#202124" sx={{ mb: 1 }}>98.4%</Typography>
                  <Typography variant="body2" sx={{ color: '#34a853', fontWeight: 700 }}>+2.4% <Box component="span" sx={{ color: 'text.disabled', fontWeight: 400 }}>vs last week</Box></Typography>
                </Card>

                {/* Incident Logs Card */}
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    border: '1px solid #e8eaed',
                    boxShadow: '10px 10px 40px rgba(0,0,0,0.04)',
                    background: alpha('#ffffff', 0.9),
                    backdropFilter: 'blur(20px)',
                    ml: { lg: 6 }
                  }}
                >
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: alpha('#1976d2', 0.1),
                        borderRadius: 2,
                        color: '#1976d2'
                      }}
                    >
                      <AutoGraph sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={800} color="#202124">INCIDENT TRACKER</Typography>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>0 Critical incidents reported today</Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* System Active Badge */}
                <Box
                  sx={{
                    p: 2,
                    px: 3,
                    bgcolor: 'white',
                    borderRadius: 100,
                    border: '1px solid #e8eaed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    width: 'fit-content',
                    alignSelf: 'flex-end',
                    mt: -2,
                    zIndex: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: '#34a853',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                  <Typography variant="caption" fontWeight={800} sx={{ color: '#202124', letterSpacing: 0.5 }}>SYSTEM ACTIVE</Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Container>


    </Stack >
  );
};

export default LandingPage;