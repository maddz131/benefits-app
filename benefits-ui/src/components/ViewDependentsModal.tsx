'use client';

import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, IconButton } from '@mui/material';
import { BsTrash, BsX } from 'react-icons/bs';
import { deleteDependent } from '../services/dependentService';
import { Dependent } from '../types';

interface ViewDependentsModalProps {
    open: boolean;
    onClose: () => void;
    dependents: Dependent[];
    employeeId: number | null;
    loading: boolean;
    onDelete?: () => void;
}

/**
 * View Dependents Modal Component
 * Modal dialog for viewing and managing dependents of an employee
 */
export const ViewDependentsModal = ({ open, onClose, dependents = [], employeeId, loading, onDelete }: ViewDependentsModalProps) => {
    const handleDeleteDependent = async (dependentId: number) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this dependent? This action cannot be undone.'
        );

        if (!confirmed) return;

        try {
            await deleteDependent(dependentId);
            onDelete?.();
        } catch (err) {
            alert('Failed to delete dependent. Please try again.');
            console.error(err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Dependents</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <BsX size={24} />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                {loading ? (
                    <Box sx={{ textAlign: 'center', padding: 4 }}>
                        <Typography>Loading dependents...</Typography>
                    </Box>
                ) : dependents.length === 0 ? (
                    <Box sx={{ textAlign: 'center', padding: 4 }}>
                        <Typography color="text.secondary">
                            No dependents found for this employee.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>First Name</strong></TableCell>
                                    <TableCell><strong>Last Name</strong></TableCell>
                                    <TableCell><strong>Relationship</strong></TableCell>
                                    <TableCell><strong>Benefits Cost</strong></TableCell>
                                    <TableCell><strong>Discount</strong></TableCell>
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dependents.map((dependent) => (
                                    <TableRow key={dependent.dependentId} hover>
                                        <TableCell>{dependent.firstName}</TableCell>
                                        <TableCell>{dependent.lastName}</TableCell>
                                        <TableCell>{dependent.relationship}</TableCell>
                                        <TableCell>${dependent.benefitsCost?.toFixed(2) || '0.00'}</TableCell>
                                        <TableCell>
                                            {dependent.discount > 0 ? (
                                                <Typography component="span" color="success.main">
                                                    ${dependent.discount.toFixed(2)} (10%)
                                                </Typography>
                                            ) : (
                                                '$0.00'
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleDeleteDependent(dependent.dependentId)}
                                                color="error"
                                                size="small"
                                                aria-label="Delete dependent"
                                            >
                                                <BsTrash />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
    );
};

