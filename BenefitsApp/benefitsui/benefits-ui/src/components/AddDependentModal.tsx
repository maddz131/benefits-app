'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem } from '@mui/material';
import { createDependent } from '../services/dependentService';

interface AddDependentModalProps {
    open: boolean;
    onClose: () => void;
    employeeId: number | null;
    onSuccess?: () => void;
}

type RelationshipOption = 'Spouse' | 'Child' | 'Parent' | 'Other';

const relationshipOptions: { value: RelationshipOption; label: string }[] = [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Child', label: 'Child' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Other', label: 'Other' }
];

/**
 * Add Dependent Modal Component
 * Modal dialog for adding a new dependent to an employee
 */
export const AddDependentModal = ({ open, onClose, employeeId, onSuccess }: AddDependentModalProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [relationship, setRelationship] = useState<RelationshipOption | ''>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!open) {
            setFirstName('');
            setLastName('');
            setRelationship('');
            setError(null);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!employeeId) {
            setError('Employee ID is required');
            return;
        }

        if (!firstName.trim() || !lastName.trim() || !relationship) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createDependent(employeeId, firstName.trim(), lastName.trim(), relationship);
            onSuccess?.();
            onClose();
        } catch (err) {
            setError('Failed to add dependent. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add Dependent</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            fullWidth
                            autoFocus
                            disabled={loading}
                        />
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            fullWidth
                            disabled={loading}
                        />
                        <TextField
                            select
                            label="Relationship"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value as RelationshipOption)}
                            required
                            fullWidth
                            disabled={loading}
                        >
                            {relationshipOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        {error && (
                            <Box sx={{ color: 'error.main', fontSize: '0.875rem', mt: -1 }}>
                                {error}
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Dependent'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

