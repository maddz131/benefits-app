import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for employee search functionality
 * @param {Array} employees - Array of employees to search through
 * @returns {Object} Search state and filtered employees
 */
export const useEmployeeSearch = (employees = []) => {
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Filter employees based on search term (real-time filtering)
     */
    const filteredEmployees = useMemo(() => {
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

