'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    Chip,
    Menu
} from '@mui/material';
import {
    Add,
    AttachFile,
    Close,
    CloudUpload,
    Save,
    WarningAmber,
    InfoOutlined,
    ArrowDropDown
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import IncidentDrawer from '../(components)/IncidentDrawer';

const CreateIncidentPage = () => {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState(null); // 'record', 'witness', 'action'
    const [recordSubtype, setRecordSubtype] = useState(null); // 'Injury/Illness', etc.
    const [recordMenuAnchor, setRecordMenuAnchor] = useState(null);

    // Lists state
    const [records, setRecords] = useState([]);
    const [witnesses, setWitnesses] = useState([]);
    const [actions, setActions] = useState([]);

    // Main Form State
    const [mainForm, setMainForm] = useState({
        title: '',
        distribution: ['admin'],
        location: '',
        eventDate: '',
        eventTime: '',
        timeUnknown: false,
        isPrivate: false,
        description: '',
        hazard: '',
        contributingConditions: '',
        contributingBehavior: ''
    });

    const handleMainFormChange = (field, value) => {
        setMainForm(prev => ({ ...prev, [field]: value }));
    };

    const handleRecordClick = (event) => {
        setRecordMenuAnchor(event.currentTarget);
    };

    const handleRecordMenuClose = () => {
        setRecordMenuAnchor(null);
    };

    const handleRecordSelect = (subtype) => {
        setDrawerType('record');
        setRecordSubtype(subtype);
        setDrawerOpen(true);
        handleRecordMenuClose();
    };

    const handleWitnessClick = () => {
        setDrawerType('witness');
        setRecordSubtype(null);
        setDrawerOpen(true);
    };

    const handleActionClick = () => {
        setDrawerType('action');
        setRecordSubtype(null);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setTimeout(() => {
            setDrawerType(null);
            setRecordSubtype(null);
        }, 200);
    };

    const handleDrawerSave = (data) => {
        if (data.type === 'record') {
            setRecords(prev => [...prev, data]);
        } else if (data.type === 'witness') {
            setWitnesses(prev => [...prev, data]);
        } else if (data.type === 'action') {
            setActions(prev => [...prev, data]);
        }
    };

    const handleCreate = async () => {
        try {
            // Parse time
            let timeData = { hour: 12, minute: 0, period: "AM" }; // Default to 12 AM, not 0 hour
            if (mainForm.eventTime) {
                const [h, m] = mainForm.eventTime.split(':').map(Number);
                const period = h >= 12 ? "PM" : "AM";
                const hour = h % 12 || 12;
                timeData = { hour, minute: m, period };
            }

            const payload = {
                incident_title: mainForm.title,
                incident_eventTime: timeData,
                incident_recordable: false, // Default or derived
                incident_description: mainForm.description || "Incident reported", // Fallback to avoid required error
                incident_eventDate: mainForm.eventDate || new Date(),
                incident_timeUnknown: mainForm.timeUnknown,
                incident_isPrivate: mainForm.isPrivate,
                investigation_contributing_behaviour: mainForm.contributingBehavior === 'ppe' ? 'Equipment' : 'Environment', // Map simplistic values
                investigation_contributing_condition: 'Physical', // Placeholder mapping

                // Mapped Lists
                recordTypeForms: records.map(r => ({
                    template: r.subtype, // Send just the string name
                    formData: r
                })),
                witnesses: witnesses.map(w => ({
                    name: w.witnessName || "Unknown Witness",
                    statement: w.statement || "No statement provided.",
                    contactNumber: w.contactNumber || "",
                    dateOfStatement: w.dateOfStatement || new Date(),
                    isRecorded: w.isRecorded || false
                })),
                actions: actions.map(a => ({
                    title: a.actionTitle || "Untitled Action",
                    description: a.actionDescription || "",
                    assignedTo: a.assignedTo || "Unassigned",
                    priority: a.priority || 'medium',
                    dueDate: a.dueDate || new Date()
                })),

                // Required by backend schema but not in UI yet (or hidden defaults)
                observation_description: "Initial Observation",
                observation_status: "Verified",
                observation_observedBy: "Safety Officer"
            };

            const response = await api.post('/incident', payload);
            console.log("Created:", response.data);
            router.push('/hse'); // Redirect to list
        } catch (error) {
            console.error("Error creation incident:", error);
            alert("Failed to create incident. Check console for details.");
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600} color="#1976d2">
                    New Incident
                </Typography>
            </Stack>

            <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>

                {/* Incident Information Section */}
                <Box mb={4}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                        Incident Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={4}>
                        {/* Row 1: Title & Distribution */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                required
                                variant="outlined"
                                placeholder="Ex: Fall from ladder"
                                value={mainForm.title}
                                onChange={(e) => handleMainFormChange('title', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Distribution</InputLabel>
                                <Select
                                    label="Distribution"
                                    value={mainForm.distribution}
                                    multiple
                                    onChange={(e) => handleMainFormChange('distribution', e.target.value)}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value === 'admin' ? 'Project Admin' : value} color="primary" variant="outlined" />
                                            ))}
                                        </Box>
                                    )}>
                                    <MenuItem value="admin">Project Admin</MenuItem>
                                    <MenuItem value="manager">Project Manager</MenuItem>
                                    <MenuItem value="safety">Safety Officer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Row 2: Location & Event Date */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Location</InputLabel>
                                <Select
                                    label="Location"
                                    value={mainForm.location}
                                    onChange={(e) => handleMainFormChange('location', e.target.value)}
                                >
                                    <MenuItem value="l1">Level 1 - Main Hall</MenuItem>
                                    <MenuItem value="l2">Level 2 - North Wing</MenuItem>
                                    <MenuItem value="ext">Exterior - Parking Lot</MenuItem>
                                    <Divider />
                                    <MenuItem value="add" sx={{ color: 'primary.main', fontWeight: 500 }}>
                                        <Add fontSize="small" sx={{ mr: 1 }} /> Add New Location
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Event Date"
                                type="date"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={mainForm.eventDate}
                                onChange={(e) => handleMainFormChange('eventDate', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <TextField
                                    fullWidth
                                    label="Event Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={mainForm.eventTime}
                                    onChange={(e) => handleMainFormChange('eventTime', e.target.value)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={mainForm.timeUnknown}
                                            onChange={(e) => handleMainFormChange('timeUnknown', e.target.checked)}
                                        />
                                    }
                                    label={<Typography variant="body2">Time Unknown</Typography>}
                                    sx={{ whiteSpace: 'nowrap' }}
                                />
                            </Stack>
                        </Grid>

                        {/* Row 3: Recordable & Private */}
                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={mainForm.isPrivate}
                                        onChange={(e) => handleMainFormChange('isPrivate', e.target.checked)}
                                    />
                                }
                                label="Private"
                            />
                        </Grid>

                        {/* Row 4: Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={4}
                                placeholder="Describe the incident in detail..."
                                variant="outlined"
                                value={mainForm.description}
                                onChange={(e) => handleMainFormChange('description', e.target.value)}
                            />
                        </Grid>

                        {/* Row 5: Attachments */}
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    border: '1px dashed #bdbdbd',
                                    borderRadius: 1,
                                    p: 3,
                                    bgcolor: '#f8f9fa',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: '#f1f1f1' }
                                }}
                            >
                                <AttachFile sx={{ fontSize: 40, color: '#757575', mb: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Attach Files</strong> or Drag & Drop
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Investigation Information Section */}
                <Box mb={4}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                        Investigation Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Hazard</InputLabel>
                                <Select
                                    label="Hazard"
                                    value={mainForm.hazard}
                                    onChange={(e) => handleMainFormChange('hazard', e.target.value)}
                                >
                                    <MenuItem value="fall">Fall</MenuItem>
                                    <MenuItem value="electrical">Electrical</MenuItem>
                                    <MenuItem value="chemical">Chemical</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Contributing Conditions</InputLabel>
                                <Select
                                    label="Contributing Conditions"
                                    value={mainForm.contributingConditions}
                                    onChange={(e) => handleMainFormChange('contributingConditions', e.target.value)}
                                >
                                    <MenuItem value="weather">Weather</MenuItem>
                                    <MenuItem value="equipment">Equipment Failure</MenuItem>
                                    <MenuItem value="housekeeping">Poor Housekeeping</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Contributing Behavior</InputLabel>
                                <Select
                                    label="Contributing Behavior"
                                    value={mainForm.contributingBehavior}
                                    onChange={(e) => handleMainFormChange('contributingBehavior', e.target.value)}
                                >
                                    <MenuItem value="procedure">Failure to follow procedure</MenuItem>
                                    <MenuItem value="ppe">Lack of PPE</MenuItem>
                                    <MenuItem value="distraction">Distraction</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                {/* Incident Records Section */}
                <Box mb={4}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                        Incident Records
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Button
                        variant="outlined"
                        endIcon={<ArrowDropDown />}
                        onClick={handleRecordClick}
                        sx={{ textTransform: 'none', justifyContent: 'space-between', minWidth: 200, py: 1.5 }}
                    >
                        Add Record
                    </Button>
                    <Menu
                        anchorEl={recordMenuAnchor}
                        open={Boolean(recordMenuAnchor)}
                        onClose={handleRecordMenuClose}
                        PaperProps={{ sx: { minWidth: 140, mt: 1 } }}
                    >
                        <MenuItem onClick={() => handleRecordSelect('Injury/Illness')}>Injury/Illness</MenuItem>
                        <MenuItem onClick={() => handleRecordSelect('Property Damage')}>Property Damage</MenuItem>
                        <MenuItem onClick={() => handleRecordSelect('Environmental')}>Environmental</MenuItem>
                        <MenuItem onClick={() => handleRecordSelect('Near Miss')}>Near Miss</MenuItem>
                    </Menu>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {records.length === 0 ? (
                            <Box sx={{ p: 2, bgcolor: '#f9fafb', borderRadius: 1, border: '1px solid #f0f0f0' }}>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    No records added yet.
                                </Typography>
                            </Box>
                        ) : (
                            records.map((rec, index) => (
                                <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {rec.subtype} Record
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {rec.description || 'No description provided.'}
                                    </Typography>
                                </Paper>
                            ))
                        )}
                    </Box>
                </Box>

                {/* Witness Statements Section */}
                <Box mb={4}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                        Witness Statements
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        sx={{ textTransform: 'none', py: 1 }}
                        onClick={handleWitnessClick}
                    >
                        Add Witness Statement
                    </Button>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {witnesses.length > 0 && witnesses.map((wit, index) => (
                            <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {wit.witnessName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {wit.statement}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* Actions Section */}
                <Box mb={4}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2c3e50' }}>
                        Actions
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        sx={{ textTransform: 'none', py: 1 }}
                        onClick={handleActionClick}
                    >
                        Add Action
                    </Button>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {actions.length > 0 && actions.map((act, index) => (
                            <Paper key={index} elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {act.actionTitle}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'primary.main', bgcolor: '#e3f2fd', px: 1, py: 0.5, borderRadius: 1 }}>
                                    {(act.priority || 'medium').toUpperCase()}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* Alerts Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <InfoOutlined fontSize="small" />
                    <Typography variant="caption">
                        Alert settings can be configured in the Company Admin tool.
                    </Typography>
                </Box>

                {/* Footer Actions */}
                <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" color="inherit">Cancel</Button>
                    <Button variant="contained" size="large" sx={{ px: 4 }} onClick={handleCreate}>Create</Button>
                </Box>

            </Paper>

            {/* Side Drawer */}
            <IncidentDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                onSave={handleDrawerSave}
                type={drawerType}
                subtype={recordSubtype}
            />
        </Container>
    );
};

export default CreateIncidentPage;