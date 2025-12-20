import { useState, useCallback, useEffect } from 'react';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';

/**
 * Custom hook for managing employees
 * @param {Array} initialEmployees - Initial employees array
 * @returns {Object} Employees state and handlers
 */
export const useEmployees = (initialEmployees = []) => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Load employees from API
     */
    const loadEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (err) {
            setError('Failed to load employees. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Handle employee deletion
     */
    const handleDeleteEmployee = useCallback(async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this employee and their dependents? ' +
            'This action cannot be undone.'
        );

        if (!confirmed) return;

        try {
            await deleteEmployee(id);
            alert('Delete successful!');
            await loadEmployees();
        } catch (err) {
            alert('Delete failed. Please try again.');
            console.error(err);
        }
    }, [loadEmployees]);

    // Load employees on mount
    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);

    return {
        employees,
        setEmployees,
        loading,
        error,
        loadEmployees,
        handleDeleteEmployee
    };
};

