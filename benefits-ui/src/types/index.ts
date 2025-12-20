/**
 * Type definitions for the application
 */

export interface Dependent {
    dependentId: number;
    firstName: string;
    lastName: string;
    relationship: string;
    benefitsCost: number;
    discount: number;
}

export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    benefitsCost: number;
    discount: number;
    dependents: Dependent[];
}

