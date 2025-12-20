/**
 * Mock Employee Data
 * Used for development when backend is not available
 */

// Mock dependents data
const mockDependents = {
    1: [
        {
            dependentId: 1,
            firstName: 'Sarah',
            lastName: 'Johnson',
            relationship: 'Spouse',
            benefitsCost: 500,
            discount: 0
        },
        {
            dependentId: 2,
            firstName: 'Emily',
            lastName: 'Johnson',
            relationship: 'Child',
            benefitsCost: 500,
            discount: 0
        }
    ],
    2: [
        {
            dependentId: 3,
            firstName: 'Michael',
            lastName: 'Smith',
            relationship: 'Spouse',
            benefitsCost: 500,
            discount: 0
        }
    ],
    3: []
};

// Mock employees data
export const mockEmployees = [
    {
        employeeId: 1,
        firstName: 'John',
        lastName: 'Johnson',
        benefitsCost: 1000,
        discount: 0, // No discount for names not starting with 'A'
        dependents: mockDependents[1]
    },
    {
        employeeId: 2,
        firstName: 'Alice',
        lastName: 'Anderson',
        benefitsCost: 900, // 10% discount for name starting with 'A'
        discount: 100,
        dependents: mockDependents[2]
    },
    {
        employeeId: 3,
        firstName: 'Bob',
        lastName: 'Williams',
        benefitsCost: 1000,
        discount: 0,
        dependents: mockDependents[3]
    },
    {
        employeeId: 4,
        firstName: 'Amy',
        lastName: 'Adams',
        benefitsCost: 900, // 10% discount for name starting with 'A'
        discount: 100,
        dependents: []
    },
    {
        employeeId: 5,
        firstName: 'David',
        lastName: 'Brown',
        benefitsCost: 1000,
        discount: 0,
        dependents: [
            {
                dependentId: 4,
                firstName: 'Anna',
                lastName: 'Brown',
                relationship: 'Spouse',
                benefitsCost: 450, // 10% discount for name starting with 'A'
                discount: 50
            },
            {
                dependentId: 5,
                firstName: 'Alex',
                lastName: 'Brown',
                relationship: 'Child',
                benefitsCost: 450, // 10% discount for name starting with 'A'
                discount: 50
            },
            {
                dependentId: 6,
                firstName: 'Charlie',
                lastName: 'Brown',
                relationship: 'Child',
                benefitsCost: 500,
                discount: 0
            }
        ]
    }
];

// Export dependents separately for the dependent service
export const getAllMockDependents = () => {
    return Object.values(mockDependents).flat();
};

/**
 * Get mock dependents for a specific employee
 * @param {number} employeeId - Employee ID
 * @returns {Array} Array of dependents for the employee
 */
export const getMockDependentsByEmployeeId = (employeeId) => {
    return mockDependents[employeeId] || [];
};

