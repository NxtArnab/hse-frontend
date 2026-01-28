import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Button,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Checkbox
} from '@mui/material';
import { Close, ExpandMore, Save } from '@mui/icons-material';

const DrawerHeader = ({ title, onClose }) => (
    <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, borderBottom: '1px solid #e0e0e0', bgcolor: '#fff' }}
    >
        <Typography variant="h6" fontWeight={600} sx={{ color: '#1f2937' }}>
            {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
            <Close />
        </IconButton>
    </Stack>
);

const DrawerFooter = ({ onCancel, onSave }) => (
    <Box
        sx={{
            p: 2,
            borderTop: '1px solid #e0e0e0',
            bgcolor: '#fff',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
        }}
    >
        <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
        </Button>
        <Button variant="contained" onClick={onSave} startIcon={<Save />}>
            Save
        </Button>
    </Box>
);

// --- Form Components ---

const InjuryIllnessForm = ({ data, onChange }) => {
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* General Information */}
            <Box>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ color: '#374151' }}>
                    General Information
                </Typography>
                <Stack spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel>Filing Type</InputLabel>
                        <Select
                            label="Filing Type"
                            value={data.filingType || "medically_treated"}
                            onChange={(e) => onChange('filingType', e.target.value)}
                        >
                            <MenuItem value="medically_treated">Medically Treated</MenuItem>
                            <MenuItem value="first_aid">First Aid</MenuItem>
                            <MenuItem value="report_only">Report Only</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={data.recordable !== false}
                                onChange={(e) => onChange('recordable', e.target.checked)}
                            />
                        }
                        label="Recordable"
                        sx={{ ml: 0 }}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Company Affected</InputLabel>
                        <Select
                            label="Company Affected"
                            value={data.companyAffected || "vortex"}
                            onChange={(e) => onChange('companyAffected', e.target.value)}
                        >
                            <MenuItem value="vortex">Vortex Properties</MenuItem>
                            <MenuItem value="subcontractor">Subcontractor A</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        placeholder="Describe the incident..."
                        value={data.description || ""}
                        onChange={(e) => onChange('description', e.target.value)}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Person Affected</InputLabel>
                        <Select
                            label="Person Affected"
                            value={data.personAffected || "sarah"}
                            onChange={(e) => onChange('personAffected', e.target.value)}
                        >
                            <MenuItem value="sarah">Sarah Smith</MenuItem>
                            <MenuItem value="john">John Doe</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>

            {/* Source of Harm Accordion */}
            <Accordion defaultExpanded elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>Source of Harm</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel>Work Activity</InputLabel>
                            <Select
                                label="Work Activity"
                                value={data.workActivity || ""}
                                onChange={(e) => onChange('workActivity', e.target.value)}
                            >
                                <MenuItem value="climbing">Climbing Ladder</MenuItem>
                                <MenuItem value="lifting">Manual Lifting</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Equipment</InputLabel>
                            <Select
                                label="Equipment"
                                value={data.equipment || ""}
                                onChange={(e) => onChange('equipment', e.target.value)}
                            >
                                <MenuItem value="ladder">Ladder</MenuItem>
                                <MenuItem value="forklift">Forklift</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Source of Harm</InputLabel>
                            <Select
                                label="Source of Harm"
                                value={data.sourceOfHarm || ""}
                                onChange={(e) => onChange('sourceOfHarm', e.target.value)}
                            >
                                <MenuItem value="gravity">Gravity / Fall</MenuItem>
                                <MenuItem value="electricity">Electricity</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {/* Injury/Illness Details Accordion */}
            <Accordion defaultExpanded elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={600}>Injury/Illness Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel>Injury/Illness</InputLabel>
                            <Select
                                label="Injury/Illness"
                                value={data.injuryType || "concusion"}
                                onChange={(e) => onChange('injuryType', e.target.value)}
                            >
                                <MenuItem value="concusion">Concussion</MenuItem>
                                <MenuItem value="fracture">Fracture</MenuItem>
                                <MenuItem value="cut">Laceration / Cut</MenuItem>
                            </Select>
                        </FormControl>

                        <Box>
                            <Typography variant="caption" color="text.secondary" gutterBottom>
                                Body Parts Affected
                            </Typography>
                            <Box sx={{
                                height: 200,
                                bgcolor: '#f3f4f6',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px dashed #9ca3af'
                            }}>
                                <Typography variant="body2" color="text.secondary">
                                    [Body Map Placeholder - Click to Select]
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

const GenericRecordForm = ({ type, data, onChange }) => (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please fill in the details for <strong>{type}</strong>.
        </Typography>
        <TextField
            fullWidth label="Reference Number"
            value={data.referenceNumber || ""}
            onChange={(e) => onChange('referenceNumber', e.target.value)}
        />
        <TextField
            fullWidth label="Description" multiline rows={4}
            value={data.description || ""}
            onChange={(e) => onChange('description', e.target.value)}
        />
        <FormControl fullWidth>
            <InputLabel>Severity</InputLabel>
            <Select
                label="Severity"
                value={data.severity || ""}
                onChange={(e) => onChange('severity', e.target.value)}
            >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
            </Select>
        </FormControl>
    </Box>
);

const WitnessStatementForm = ({ data, onChange }) => (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            fullWidth label="Witness Name" required
            value={data.witnessName || ""}
            onChange={(e) => onChange('witnessName', e.target.value)}
        />
        <TextField
            fullWidth label="Contact Number"
            value={data.contactNumber || ""}
            onChange={(e) => onChange('contactNumber', e.target.value)}
        />
        <TextField
            fullWidth label="Statement" multiline rows={6}
            placeholder="Record the witness statement verbatim..."
            value={data.statement || ""}
            onChange={(e) => onChange('statement', e.target.value)}
        />
        <TextField
            fullWidth type="date" label="Date of Statement" InputLabelProps={{ shrink: true }}
            value={data.dateOfStatement || ""}
            onChange={(e) => onChange('dateOfStatement', e.target.value)}
        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={data.isRecorded || false}
                    onChange={(e) => onChange('isRecorded', e.target.checked)}
                />
            }
            label="Statement was recorded audio/video"
        />
    </Box>
);

const ActionForm = ({ data, onChange }) => (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
            fullWidth label="Action Title" required
            value={data.actionTitle || ""}
            onChange={(e) => onChange('actionTitle', e.target.value)}
        />
        <TextField
            fullWidth label="Action Description" multiline rows={3}
            value={data.actionDescription || ""}
            onChange={(e) => onChange('actionDescription', e.target.value)}
        />
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>Assigned To</InputLabel>
                    <Select
                        label="Assigned To"
                        value={data.assignedTo || ""}
                        onChange={(e) => onChange('assignedTo', e.target.value)}
                    >
                        <MenuItem value="admin">Project Admin</MenuItem>
                        <MenuItem value="safety">Safety Manager</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        label="Priority"
                        value={data.priority || "medium"}
                        onChange={(e) => onChange('priority', e.target.value)}
                    >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="urgent">Urgent</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth type="date" label="Due Date" InputLabelProps={{ shrink: true }}
                    value={data.dueDate || ""}
                    onChange={(e) => onChange('dueDate', e.target.value)}
                />
            </Grid>
        </Grid>
    </Box>
);


const IncidentDrawer = ({ open, type, subtype, onClose, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (open) {
            setFormData({}); // Reset form when drawer opens
        }
    }, [open, type, subtype]);

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveClick = () => {
        if (onSave) {
            // Include type/subtype in the data
            onSave({ ...formData, type, subtype });
        }
        onClose();
    };

    let title = '';
    let content = null;

    if (type === 'record') {
        title = `New ${subtype} Record`;
        if (subtype === 'Injury/Illness') {
            content = <InjuryIllnessForm data={formData} onChange={handleFieldChange} />;
        } else {
            content = <GenericRecordForm type={subtype} data={formData} onChange={handleFieldChange} />;
        }
    } else if (type === 'witness') {
        title = 'New Witness Statement';
        content = <WitnessStatementForm data={formData} onChange={handleFieldChange} />;
    } else if (type === 'action') {
        title = 'New Action';
        content = <ActionForm data={formData} onChange={handleFieldChange} />;
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 600, md: 800 } }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <DrawerHeader title={title} onClose={onClose} />
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    {content}
                </Box>
                <DrawerFooter onCancel={onClose} onSave={handleSaveClick} />
            </Box>
        </Drawer>
    );
};

export default IncidentDrawer;
