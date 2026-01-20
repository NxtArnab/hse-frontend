"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, alpha } from "@mui/material";
import {
  Warning,
  Error as ErrorIcon,
  Info,
} from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "type",
    headerName: "Incident Type",
    width: 180,
    renderCell: (params) => <Box sx={{ fontWeight: 500 }}>{params.value}</Box>,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    flex: 1,
  },
  {
    field: "severity",
    headerName: "Severity",
    width: 130,
    renderCell: (params) => {
      let color = "default";
      let icon = <Info fontSize="small" />;

      switch (params.value.toLowerCase()) {
        case "critical":
          color = "error";
          icon = <ErrorIcon fontSize="small" />;
          break;
        case "high":
          color = "warning";
          icon = <Warning fontSize="small" />;
          break;
        case "medium":
          color = "info";
          break;
        case "low":
          color = "success";
          break;
      }

      return (
        <Chip
          icon={icon}
          label={params.value}
          color={color}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params) => {
      let bgcolor = alpha("#9e9e9e", 0.1);
      let color = "#757575";

      switch (params.value.toLowerCase()) {
        case "open":
          bgcolor = alpha("#2196f3", 0.1);
          color = "#1976d2";
          break;
        case "in progress":
          bgcolor = alpha("#ff9800", 0.1);
          color = "#ed6c02";
          break;
        case "resolved":
          bgcolor = alpha("#4caf50", 0.1);
          color = "#2e7d32";
          break;
      }

      return (
        <Box
          sx={{
            color,
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
  { field: "date", headerName: "Date Reported", width: 150 },
  { field: "reportedBy", headerName: "Reported By", width: 160 },
];

const rows = [
  {
    id: "INC-001",
    type: "Injury",
    description: "Slip and fall in warehouse aisle 3",
    severity: "Medium",
    status: "Resolved",
    date: "2024-01-15",
    reportedBy: "John Doe",
  },
  {
    id: "INC-002",
    type: "Near Miss",
    description: "Forklift almost hit pedestrian",
    severity: "High",
    status: "Open",
    date: "2024-01-18",
    reportedBy: "Jane Smith",
  },
  {
    id: "INC-003",
    type: "Equipment Failure",
    description: "Conveyor belt motor overheating",
    severity: "Critical",
    status: "In Progress",
    date: "2024-01-19",
    reportedBy: "Mike Johnson",
  },
  {
    id: "INC-004",
    type: "Environmental",
    description: "Oil spill in loading dock area",
    severity: "Medium",
    status: "Resolved",
    date: "2024-01-10",
    reportedBy: "Sarah Wilson",
  },
  {
    id: "INC-005",
    type: "Hazard",
    description: "Loose wiring exposed in break room",
    severity: "Low",
    status: "Open",
    date: "2024-01-19",
    reportedBy: "Ashish",
  }, // Assuming current user is Ashish for "My Requests" demo
];

const IncidentTable = ({ filter }) => {
  // Simple filtering mock-up based on the passed filter prop
  // In a real app, this would likely be handled by an API call or more complex local filtering
  const filteredRows =
    filter === "my" ? rows.filter((row) => row.reportedBy === "Ashish") : rows;

  return (
    <DataGrid
      rows={filteredRows}
      columns={columns}
      density="compact"
      showToolbar
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10, 20]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default IncidentTable;
