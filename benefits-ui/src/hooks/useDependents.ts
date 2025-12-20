import { useState, useCallback } from 'react';
import { fetchDependents } from '../services/dependentService';
import { Dependent } from '../types';

/**
 * Return type for useDependents hook
 */
export interface UseDependentsReturn {
    dependents: Dependent[];
    setDependents: React.Dispatch<React.SetStateAction<Dependent[]>>;
    selectedEmployeeId: number | string | null;
    setSelectedEmployeeId: React.Dispatch<React.SetStateAction<number | string | null>>;
    loading: boolean;
    error: string | null;
    showAddDependentModal: boolean;
    showViewDependentsModal: boolean;
    handleViewDependents: (employeeId: number | string) => Promise<void>;
    handleAddDependent: (employeeId: number | string) => void;
    handleCloseAddDependentModal: () => void;
    handleCloseViewDependentsModal: () => void;
}

/**
 * Custom hook for managing dependents
 * @param initialDependents - Initial dependents array
 * @returns Dependents state and handlers
 */
export const useDependents = (initialDependents: Dependent[] = []): UseDependentsReturn => {
    const [dependents, setDependents] = useState<Dependent[]>(initialDependents);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddDependentModal, setShowAddDependentModal] = useState<boolean>(false);
    const [showViewDependentsModal, setShowViewDependentsModal] = useState<boolean>(false);

    /**
     * Handle viewing dependents for an employee
     */
    const handleViewDependents = useCallback(async (employeeId: number | string): Promise<void> => {
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
    const handleAddDependent = useCallback((employeeId: number | string): void => {
        setSelectedEmployeeId(employeeId);
        setShowAddDependentModal(true);
    }, []);

    /**
     * Close the add dependent modal
     */
    const handleCloseAddDependentModal = useCallback((): void => {
        setShowAddDependentModal(false);
        setSelectedEmployeeId(null);
    }, []);

    /**
     * Close the view dependents modal
     */
    const handleCloseViewDependentsModal = useCallback((): void => {
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

