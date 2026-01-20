"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  alpha,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import {
  Security,
  Visibility,
  VisibilityOff,
  TrendingUp,
  AutoGraph,
  CheckCircleOutline,
  HealthAndSafety,
  ArrowForward,
} from "@mui/icons-material";

const LoginPage = () => {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await login(formData);
      router.push("/hse");
    } catch (err) {
      // Display error message
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: field === "rememberMe" ? e.target.checked : e.target.value,
    });
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        bgcolor: "#fafbfc",
        position: "relative",
        // Grid Background
        backgroundImage: `
          linear-gradient(#e8eaed 1px, transparent 1px),
          linear-gradient(90deg, #e8eaed 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 50% 50%, transparent, #fafbfc 85%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          p: 3,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#1976d2",
                borderRadius: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              }}
            >
              <Security sx={{ fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ color: "#202124", letterSpacing: -0.5 }}
            >
              HSE
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          sx={{
            flex: 1,
            p: { xs: 4, md: 8 },
            justifyContent: "center",
            alignItems: "center",
            bgcolor: alpha("#ffffff", 0.4),
            backdropFilter: "blur(40px)",
            borderLeft: { lg: "1px solid #e8eaed" },
          }}
        >
          <Card
            elevation={0}
            sx={{
              maxWidth: 480,
              width: "100%",
              p: { xs: 4, md: 5 },
              borderRadius: 5,
              border: "1px solid #e8eaed",
              boxShadow: "0 20px 80px rgba(0,0,0,0.08)",
              background: alpha("#ffffff", 0.98),
              backdropFilter: "blur(20px)",
            }}
          >
            <Stack spacing={4}>
              {/* Header */}
              <Stack spacing={1.5}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: "#202124",
                    letterSpacing: -0.5,
                  }}
                >
                  Sign In
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5f6368",
                    fontWeight: 500,
                  }}
                >
                  Enter your credentials to access your account
                </Typography>
              </Stack>

              {/* Form */}
              <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                {/* Error Alert */}
                {error && (
                  <Alert
                    severity="error"
                    onClose={() => setError("")}
                    sx={{
                      borderRadius: 2,
                      "& .MuiAlert-message": {
                        fontWeight: 500,
                      },
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  autoComplete="email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      bgcolor: alpha("#fafbfc", 0.8),
                      "&:hover": {
                        bgcolor: "#ffffff",
                      },
                      "&.Mui-focused": {
                        bgcolor: "#ffffff",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  required
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#5f6368" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      bgcolor: alpha("#fafbfc", 0.8),
                      "&:hover": {
                        bgcolor: "#ffffff",
                      },
                      "&.Mui-focused": {
                        bgcolor: "#ffffff",
                      },
                    },
                  }}
                />

                {/* Remember Me & Forgot Password */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.rememberMe}
                        onChange={handleChange("rememberMe")}
                        sx={{
                          color: "#5f6368",
                          "&.Mui-checked": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ color: "#5f6368", fontWeight: 500 }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                  <Button
                    component={Link}
                    href="/auth/forgot-password"
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#1976d2",
                      "&:hover": {
                        bgcolor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot password?
                  </Button>
                </Stack>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ArrowForward />
                    )
                  }
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Stack>

              {/* Divider */}
              <Divider sx={{ my: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#5f6368", fontWeight: 600 }}
                >
                  OR
                </Typography>
              </Divider>

              {/* Sign Up Link */}
              <Stack direction="row" justifyContent="center" spacing={0.5}>
                <Typography
                  variant="body2"
                  sx={{ color: "#5f6368", fontWeight: 500 }}
                >
                  Don't have an account?
                </Typography>
                <Button
                  component={Link}
                  href="/auth/signup"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#1976d2",
                    p: 0,
                    minWidth: "auto",
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up
                </Button>
              </Stack>

              {/* Security Badge */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: alpha("#34a853", 0.05),
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha("#34a853", 0.15),
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <HealthAndSafety sx={{ color: "#34a853", fontSize: 20 }} />
                <Typography
                  variant="caption"
                  sx={{ color: "#5f6368", fontWeight: 600 }}
                >
                  Your data is protected with enterprise-grade security
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
