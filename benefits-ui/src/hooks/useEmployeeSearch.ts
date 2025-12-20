import { useState, useMemo } from 'react';
import { Employee } from '../types';

/**
 * Return type for useEmployeeSearch hook
 */
export interface UseEmployeeSearchReturn {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    filteredEmployees: Employee[];
}

/**
 * Custom hook for employee search functionality
 * @param employees - Array of employees to search through
 * @returns Search state and filtered employees
 */
export const useEmployeeSearch = (employees: Employee[] = []): UseEmployeeSearchReturn => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    /**
     * Filter employees based on search term (real-time filtering)
     */
    const filteredEmployees = useMemo<Employee[]>(() => {
        if (!searchTerm) return employees;

        const searchLower = searchTerm.toLowerCase();
        return employees.filter(emp => {
            const firstNameMatch = emp.firstName?.toLowerCase()?.includes(searchLower) ?? false;
            const lastNameMatch = emp.lastName?.toLowerCase()?.includes(searchLower) ?? false;
            return firstNameMatch || lastNameMatch;
        });
    }, [employees, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredEmployees
    };
};

