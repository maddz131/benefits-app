import { EmployeeRow } from './EmployeeRow';
import { Employee } from '../types';

interface EmployeeTableProps {
    employees: Employee[];
    onAddDependent: (employeeId: number) => void;
    onViewDependents: (employeeId: number) => void;
    onDelete: (employeeId: number) => void;
}

/**
 * Employee Table Component
 * Displays a table of employees with actions
 */
export const EmployeeTable = ({ employees, onAddDependent, onViewDependents, onDelete }: EmployeeTableProps) => {
    return (
        <div className="employee-table-container">
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee Cost</th>
                        <th>Dependents Cost</th>
                        <th>Total Discounts</th>
                        <th>Final Cost</th>
                        <th>Add Dependent</th>
                        <th>View Dependents</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="empty-state">
                                No employees found
                            </td>
                        </tr>
                    ) : (
                        employees.map(employee => (
                            <EmployeeRow
                                key={employee.employeeId}
                                employee={employee}
                                onAddDependent={onAddDependent}
                                onViewDependents={onViewDependents}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

