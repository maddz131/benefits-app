import { useState, useCallback } from 'react';
import { fetchDependents } from '../services/dependentService';

/**
 * Custom hook for managing dependents
 * @param {Array} initialDependents - Initial dependents array
 * @returns {Object} Dependents state and handlers
 */
export const useDependents = (initialDependents = []) => {
    const [dependents, setDependents] = useState(initialDependents);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddDependentModal, setShowAddDependentModal] = useState(false);
    const [showViewDependentsModal, setShowViewDependentsModal] = useState(false);

    /**
     * Handle viewing dependents for an employee
     */
    const handleViewDependents = useCallback(async (employeeId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDependents(employeeId);
            setDependents(data);
            setSelectedEmployeeId(employeeId);
            setShowViewDependentsModal(true);
        } catch (err) {
            setError('Failed to load dependents. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Handle adding a dependent - opens the modal
     */
    const handleAddDependent = useCallback((employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShowAddDependentModal(true);
    }, []);

    /**
     * Close the add dependent modal
     */
    const handleCloseAddDependentModal = useCallback(() => {
        setShowAddDependentModal(false);
        setSelectedEmployeeId(null);
    }, []);

    /**
     * Close the view dependents modal
     */
    const handleCloseViewDependentsModal = useCallback(() => {
        setShowViewDependentsModal(false);
    }, []);

    return {
        dependents,
        setDependents,
        selectedEmployeeId,
        setSelectedEmployeeId,
        loading,
        error,
        showAddDependentModal,
        showViewDependentsModal,
        handleViewDependents,
        handleAddDependent,
        handleCloseAddDependentModal,
        handleCloseViewDependentsModal
    };
};

