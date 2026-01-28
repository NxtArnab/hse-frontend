import React, { useEffect, useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Stack,
    Divider,
    Grid,
    Chip,
    alpha,
    CircularProgress,
    Paper,
} from '@mui/material';
import {
    Close,
    Event,
    AccessTime,
    Person,
    Description,
    Security,
    RecordVoiceOver,
    FactCheck,
} from '@mui/icons-material';
import api from '@/utils/api';

const IncidentDetailDrawer = ({ open, incidentId, onClose }) => {
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchIncidentDetails = async () => {
            if (!incidentId || !open) return;
            try {
                setLoading(true);
                const response = await api.get(`/incident/${incidentId}`);
                setIncident(response.data.data);
            } catch (error) {
                console.error("Error fetching incident details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidentDetails();
    }, [incidentId, open]);

    const DetailItem = ({ icon, label, value }) => (
        <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
                {icon}
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
                    {label}
                </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={500}>
                {value || 'N/A'}
            </Typography>
        </Stack>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 600, md: 700 }, bgcolor: '#f9fafb' }
            }}
        >
            <Stack sx={{ height: '100%' }}>
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box sx={{
                                width: 40, height: 40, borderRadius: 1.5,
                                bgcolor: alpha('#1976d2', 0.1),
                                color: '#1976d2',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Security />
                            </Box>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    Incident Details
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {incidentId ? `#${incidentId.substring(incidentId.length - 6).toUpperCase()}` : ''}
                                </Typography>
                            </Box>
                        </Stack>
                        <IconButton onClick={onClose} size="small">
                            <Close />
                        </IconButton>
                    </Stack>
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : incident ? (
                        <Stack spacing={4}>
                            {/* Title and Status */}
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h5" fontWeight={800} gutterBottom>
                                        {incident.incident_title || 'Untitled Incident'}
                                    </Typography>
                                    <Chip
                                        label="OPEN"
                                        size="small"
                                        sx={{
                                            bgcolor: alpha('#2196f3', 0.1),
                                            color: '#1976d2',
                                            fontWeight: 700
                                        }}
                                    />
                                </Box>
                                <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#fff', border: '1px solid #e5e7eb', borderRadius: 2 }}>
                                    <DetailItem
                                        icon={<Event sx={{ fontSize: 18, color: '#6b7280' }} />}
                                        label="Reported Date"
                                        value={new Date(incident.createdAt).toLocaleDateString()}
                                    />
                                </Paper>
                            </Stack>

                            {/* Core Info Grid */}
                            <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff', border: '1px solid #e5e7eb', borderRadius: 2 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <DetailItem
                                            icon={<Event sx={{ fontSize: 18, color: '#1976d2' }} />}
                                            label="Event Date"
                                            value={incident.incident_eventDate ? new Date(incident.incident_eventDate).toLocaleDateString() : 'N/A'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DetailItem
                                            icon={<AccessTime sx={{ fontSize: 18, color: '#1976d2' }} />}
                                            label="Event Time"
                                            value={incident.incident_eventTime ? `${incident.incident_eventTime.hour}:${incident.incident_eventTime.minute} ${incident.incident_eventTime.period}` : 'N/A'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DetailItem
                                            icon={<Person sx={{ fontSize: 18, color: '#1976d2' }} />}
                                            label="Reported By"
                                            value={incident.createdBy?.name || 'Unknown'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DetailItem
                                            icon={<Description sx={{ fontSize: 18, color: '#1976d2' }} />}
                                            label="Recordable"
                                            value={incident.incident_recordable ? 'Yes' : 'No'}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Description */}
                            <Box>
                                <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Description fontSize="small" color="primary" /> Description
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
                                    {incident.incident_description || 'No description provided.'}
                                </Typography>
                            </Box>

                            <Divider />

                            {/* Record Type Forms */}
                            {incident.recordTypeForms?.length > 0 && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <FactCheck fontSize="small" color="primary" /> Records ({incident.recordTypeForms.length})
                                    </Typography>
                                    <Stack spacing={2}>
                                        {incident.recordTypeForms.map((form, index) => (
                                            <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 1.5 }}>
                                                <Typography variant="body2" fontWeight={700} color="primary" gutterBottom>
                                                    {form.template}
                                                </Typography>
                                                <Divider sx={{ mb: 1.5, opacity: 0.5 }} />
                                                <Grid container spacing={2}>
                                                    {form.formData && Object.entries(form.formData).map(([key, value]) => (
                                                        <Grid item xs={12} sm={6} key={key}>
                                                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                                                {key.replace(/([A-Z])/g, ' $1')}
                                                            </Typography>
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (String(value) || 'N/A')}
                                                            </Typography>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {/* Witnesses */}
                            {incident.witnesses?.length > 0 && (
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <RecordVoiceOver fontSize="small" color="primary" /> Witnesses ({incident.witnesses.length})
                                    </Typography>
                                    <Stack spacing={2}>
                                        {incident.witnesses.map((witness, index) => (
                                            <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 1.5, bgcolor: '#fefefe' }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: alpha('#1976d2', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Person color="primary" />
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body2" fontWeight={700}>
                                                            {witness.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {witness.contactNumber || 'No contact info'}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Typography variant="body2" sx={{ mt: 1.5, color: '#4b5563', fontStyle: witness.statement ? 'normal' : 'italic' }}>
                                                    {witness.statement || 'No statement recorded.'}
                                                </Typography>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Stack>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography color="text.secondary">Incident not found.</Typography>
                        </Box>
                    )}
                </Box>
            </Stack>
        </Drawer>
    );
};

export default IncidentDetailDrawer;
