'use client';

import { EmployeeTable } from './components/EmployeeTable';
import { SearchBar } from './components/SearchBar';
import { AddDependentModal } from './components/AddDependentModal';
import { ViewDependentsModal } from './components/ViewDependentsModal';
import { useEmployees } from './hooks/useEmployees';
import { useDependents } from './hooks/useDependents';
import { useEmployeeSearch } from './hooks/useEmployeeSearch';
import { Employee, Dependent } from './types';

interface EmployeesProps {
    initialEmployees?: Employee[];
    initialDependents?: Dependent[];
}

/**
 * Employees Component
 * Main component for displaying and managing employees
 */
export const Employees = ({
    initialEmployees = [],
    initialDependents = [],
}: EmployeesProps) => {
    // Custom hooks for managing employees, dependents, and search
    const {
        employees,
        loading,
        error,
        handleDeleteEmployee,
        loadEmployees
    } = useEmployees(initialEmployees);

    const {
        handleViewDependents,
        handleAddDependent,
        showAddDependentModal,
        showViewDependentsModal,
        handleCloseAddDependentModal,
        handleCloseViewDependentsModal,
        selectedEmployeeId,
        dependents,
        loading: dependentsLoading
    } = useDependents(initialDependents);

    const {
        searchTerm,
        setSearchTerm,
        filteredEmployees
    } = useEmployeeSearch(employees);

    // Loading state
    if (loading && employees.length === 0) {
        return <div>Loading employees...</div>;
    }

    // Error state
    if (error && employees.length === 0) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="employees-container">
            <div className="employees-header">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                {error && <div className="error-message">{error}</div>}
            </div>
            
            <EmployeeTable
                employees={filteredEmployees}
                onAddDependent={handleAddDependent}
                onViewDependents={handleViewDependents}
                onDelete={handleDeleteEmployee}
            />

            <AddDependentModal
                open={showAddDependentModal}
                onClose={handleCloseAddDependentModal}
                employeeId={selectedEmployeeId !== null ? Number(selectedEmployeeId) : null}
                onSuccess={loadEmployees}
            />

            <ViewDependentsModal
                open={showViewDependentsModal}
                onClose={handleCloseViewDependentsModal}
                dependents={dependents}
                employeeId={selectedEmployeeId !== null ? Number(selectedEmployeeId) : null}
                loading={dependentsLoading}
                onDelete={() => {
                    loadEmployees();
                    if (selectedEmployeeId) {
                        handleViewDependents(selectedEmployeeId);
                    }
                }}
            />
        </div>
    );
};

