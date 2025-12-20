import { Employee } from '../types';

/**
 * Utility functions for employee calculations
 */

/**
 * Calculate total discount for an employee (employee discount + all dependent discounts)
 * @param employee - Employee object with discount and dependents array
 * @returns Total discount amount
 */
export const calculateTotalDiscount = (employee: Employee | null | undefined): number => {
    if (!employee || !employee.dependents) return employee?.discount || 0;
    
    const dependentsDiscount = employee.dependents.reduce(
        (acc, curr) => acc + (curr.discount || 0), 
        0
    );
    return (employee.discount || 0) + dependentsDiscount;
};

/**
 * Calculate total cost of all dependents for an employee
 * @param employee - Employee object with dependents array
 * @returns Total dependents cost
 */
export const calculateDependentsCost = (employee: Employee | null | undefined): number => {
    if (!employee || !employee.dependents || employee.dependents.length === 0) {
        return 0;
    }
    return employee.dependents.reduce(
        (acc, curr) => acc + (curr.benefitsCost || 0), 
        0
    );
};

/**
 * Calculate final cost for an employee
 * @param employee - Employee object with benefitsCost and dependents
 * @returns Final cost (employee cost + dependents cost - total discount)
 */
export const calculateFinalCost = (employee: Employee | null | undefined): number => {
    const employeeCost = employee?.benefitsCost || 0;
    const dependentsCost = calculateDependentsCost(employee);
    const totalDiscount = calculateTotalDiscount(employee);
    return employeeCost + dependentsCost - totalDiscount;
};

