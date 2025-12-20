import { variables } from '../Variables';
import { USE_MOCK_DATA, simulateApiDelay } from '../config/apiConfig';
import { mockEmployees } from '../data/mockEmployees';

/**
 * Employee API Service
 * Handles all API calls related to employees
 */

/**
 * Fetch all employees
 * @returns {Promise<Array>} Array of employee objects
 */
export const fetchEmployees = async () => {
    if (USE_MOCK_DATA) {
        await simulateApiDelay();
        // Return a deep copy to simulate fresh data
        return JSON.parse(JSON.stringify(mockEmployees));
    }

    try {
        const response = await fetch(`${variables.API_URL}employees`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

/**
 * Create a new employee
 * @param {string} firstName - Employee first name
 * @param {string} lastName - Employee last name
 * @returns {Promise<Object>} Created employee object
 */
export const createEmployee = async (firstName, lastName) => {
    if (USE_MOCK_DATA) {
        await simulateApiDelay();
        // Calculate discount (10% if name starts with 'A')
        const baseCost = 1000;
        const discount = firstName.charAt(0).toLowerCase() === 'a' ? 100 : 0;
        const benefitsCost = baseCost - discount;

        const newEmployee = {
            employeeId: mockEmployees.length + 1,
            firstName,
            lastName,
            benefitsCost,
            discount,
            dependents: []
        };
        
        mockEmployees.push(newEmployee);
        return newEmployee;
    }

    try {
        const response = await fetch(`${variables.API_URL}employees`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

/**
 * Delete an employee
 * @param {number|string} id - Employee ID
 * @returns {Promise<boolean>} True if successful
 */
export const deleteEmployee = async (id) => {
    if (USE_MOCK_DATA) {
        await simulateApiDelay();
        const index = mockEmployees.findIndex(emp => emp.employeeId === Number(id));
        if (index !== -1) {
            mockEmployees.splice(index, 1);
            return true;
        }
        throw new Error('Employee not found');
    }

    try {
        const response = await fetch(`${variables.API_URL}employees/${id}`, {
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
        console.error('Error deleting employee:', error);
        throw error;
    }
};

