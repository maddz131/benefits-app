import { BsPersonPlusFill, BsPeopleFill, BsTrash } from "react-icons/bs";
import { calculateDependentsCost, calculateTotalDiscount, calculateFinalCost } from '../utils/employeeCalculations';
import { Employee } from '../types';

interface EmployeeRowProps {
    employee: Employee;
    onAddDependent: (employeeId: number) => void;
    onViewDependents: (employeeId: number) => void;
    onDelete: (employeeId: number) => void;
}

/**
 * Employee Table Row Component
 * Displays a single employee row with actions
 */
export const EmployeeRow = ({ employee, onAddDependent, onViewDependents, onDelete }: EmployeeRowProps) => {
    const dependentsCost = calculateDependentsCost(employee);
    const totalDiscount = calculateTotalDiscount(employee);
    const finalCost = calculateFinalCost(employee);

    return (
        <tr>
            <td>{employee.employeeId}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>${employee.benefitsCost?.toFixed(2) || '0.00'}</td>
            <td>${dependentsCost.toFixed(2)}</td>
            <td>${totalDiscount.toFixed(2)}</td>
            <td>${finalCost.toFixed(2)}</td>
            <td>
                <BsPersonPlusFill
                    onClick={() => onAddDependent(employee.employeeId)}
                    style={{ cursor: 'pointer' }}
                    aria-label="Add dependent"
                />
            </td>
            <td>
                <BsPeopleFill
                    onClick={() => onViewDependents(employee.employeeId)}
                    style={{ cursor: 'pointer' }}
                    aria-label="View dependents"
                />
            </td>
            <td>
                <BsTrash
                    onClick={() => onDelete(employee.employeeId)}
                    style={{ cursor: 'pointer' }}
                    aria-label="Delete employee"
                />
            </td>
        </tr>
    );
};

