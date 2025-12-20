import { variables } from '../Variables';
import { USE_MOCK_DATA, simulateApiDelay } from '../config/apiConfig';
import { getMockDependentsByEmployeeId, mockEmployees } from '../data/mockEmployees';

/**
 * Dependent API Service
 * Handles all API calls related to dependents
 */

/**
 * Fetch dependents for an employee
 * @param {number|string} employeeId - Employee ID
 * @returns {Promise<Array>} Array of dependent objects
 */
export const fetchDependents = async (employeeId) => {
    if (USE_MOCK_DATA) {
        await simulateApiDelay();
        // Find employee and return their dependents
        const employee = mockEmployees.find(emp => emp.employeeId === Number(employeeId));
        return employee ? JSON.parse(JSON.stringify(employee.dependents || [])) : [];
    }

    try {
        const response = await fetch(`${variables.API_URL}dependent/${employeeId}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dependents:', error);
        throw error;
    }
};

/**
 * Create a new dependent
 * @param {number|string} employeeId - Employee ID
 * @param {string} firstName - Dependent first name
 * @param {string} lastName - Dependent last name
 * @param {string} relationship - Relationship to employee
 * @returns {Promise<Object>} Created dependent object
 */
export const createDependent = async (employeeId, firstName, lastName, relationship) => {
    if (USE_MOCK_DATA) {
        await simulateApiDelay();
        const employee = mockEmployees.find(emp => emp.employeeId === Number(employeeId));
        if (!employee) {
            throw new Error('Employee not found');
        }

        // Calculate discount (10% if name starts with 'A')
        const baseCost = 500;
        const discount = firstName.charAt(0).toLowerCase() === 'a' ? 50 : 0;
        const benefitsCost = baseCost - discount;

        // Generate new dependent ID
        const allDependents = mockEmployees.flatMap(emp => emp.dependents || []);
        const maxId = allDependents.length > 0 
            ? Math.max(...allDependents.map(dep => dep.dependentId))
            : 0;

        const newDependent = {
            dependentId: maxId + 1,
            firstName,
            lastName,
            relationship,
            benefitsCost,
            discount
        };

        if (!employee.dependents) {
            employee.dependents = [];
        }
        employee.dependents.push(newDependent);

        return newDependent;
    }

    try {
        const response = await fetch(`${variables.API_URL}dependent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                Relationship: relationship,
                EmployeeId: employeeId
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating dependent:', error);
        throw error;
    }
};

/**
 * Delete a dependent
 * @param {number|string} id - Dependent ID
 * @returns {Promise<boolean>} True if successful
 */
export const deleteDependent = async (id) => {
    if (USE_MOCK_DATA) {
        await simulateApiDelay();
        for (const employee of mockEmployees) {
            if (employee.dependents) {
                const index = employee.dependents.findIndex(dep => dep.dependentId === Number(id));
                if (index !== -1) {
                    employee.dependents.splice(index, 1);
                    return true;
                }
            }
        }
        throw new Error('Dependent not found');
    }

    try {
        const response = await fetch(`${variables.API_URL}dependent/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return true;
    } catch (error) {
        console.error('Error deleting dependent:', error);
        throw error;
    }
};

