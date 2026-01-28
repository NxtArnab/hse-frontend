"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, alpha } from "@mui/material";
import {
  Warning,
  Error as ErrorIcon,
  Info,
  Delete,
} from "@mui/icons-material";
import api from "@/utils/api";
import useAuthStore from "@/store/useAuthStore";
import IncidentDetailDrawer from "./IncidentDetailDrawer";
import { Button, Stack, Typography, IconButton } from "@mui/material";

const IncidentTable = ({ filter }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthStore();

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/incident');
      const data = response.data.data;

      // Map backend data to table rows
      const mappedRows = data.map((inc) => ({
        id: inc._id.substring(inc._id.length - 6).toUpperCase(), // Short ID from MongoDB _id
        type: inc.recordTypeForms?.[0]?.template || "Incident",
        description: inc.incident_description || "No description",
        severity: "Low", // Default since not in schema yet
        status: "OPEN",
        date: new Date(inc.createdAt).toLocaleDateString(),
        reportedBy: inc.createdBy?.name || "Unknown",
        reportedById: inc.createdBy?._id,
        fullId: inc._id
      }));

      setIncidents(mappedRows);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleOpenDetail = (id) => {
    setSelectedIncidentId(id);
    setIsDrawerOpen(true);
  };

  const handleSingleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this incident?")) {
      return;
    }

    try {
      await api.delete(`/incident/${id}`);
      await fetchIncidents();
    } catch (error) {
      console.error("Error deleting incident:", error);
      alert("Failed to delete incident");
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} incident(s)?`)) {
      return;
    }

    try {
      await api.delete('/incident/bulk-delete', { data: { ids: selectedIds } });
      await fetchIncidents();
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting incidents:", error);
      alert("Failed to delete incidents");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
      renderCell: (params) => (
        <Button
          onClick={() => handleOpenDetail(params.row.fullId)}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            color: '#1976d2',
            justifyContent: 'flex-start',
            p: 0,
            '&:hover': {
              textDecoration: 'underline',
              bgcolor: 'transparent'
            }
          }}
        >
          {params.value}
        </Button>
      )
    },
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
        const val = params.value || "Low";

        switch (val.toLowerCase()) {
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
            label={val}
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
        const val = params.value || "OPEN";

        switch (val.toLowerCase()) {
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
            {val}
          </Box>
        );
      },
    },
    { field: "date", headerName: "Date Reported", width: 150 },
    { field: "reportedBy", headerName: "Reported By", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleSingleDelete(params.row.fullId);
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      )
    }
  ];

  const filteredRows =
    filter === "my" ? incidents.filter((row) => row.reportedById === user?._id) : incidents;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
      {selectedIds.length > 0 && (
        <Stack direction="row" px={1} py={0.5} bgcolor={alpha('#ef4444', 0.05)} borderRadius={1} justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontWeight={600} color="error">
            {selectedIds.length} items selected
          </Typography>
          <Button
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
            sx={{ fontWeight: 700 }}
          >
            Delete Selected
          </Button>
        </Stack>
      )}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
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
        getRowId={(row) => row.fullId} // Use MongoDB ID for DataGrid row selection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedIds(newSelection);
        }}
      />
      <IncidentDetailDrawer
        open={isDrawerOpen}
        incidentId={selectedIncidentId}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Box>
  );
};

export default IncidentTable;
