import { useState, useCallback, useEffect } from 'react';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';
import { Employee } from '../types';

/**
 * Return type for useEmployees hook
 */
export interface UseEmployeesReturn {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    loading: boolean;
    error: string | null;
    loadEmployees: () => Promise<void>;
    handleDeleteEmployee: (id: number | string) => Promise<void>;
}

/**
 * Custom hook for managing employees
 * @param initialEmployees - Initial employees array
 * @returns Employees state and handlers
 */
export const useEmployees = (initialEmployees: Employee[] = []): UseEmployeesReturn => {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Load employees from API
     */
    const loadEmployees = useCallback(async (): Promise<void> => {
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
    const handleDeleteEmployee = useCallback(async (id: number | string): Promise<void> => {
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

