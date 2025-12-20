# Mock Data

This directory contains mock data for development when the backend is not available.

## Using Mock Data

Mock data is currently enabled by default. To switch between mock and real API:

1. Open `src/config/apiConfig.js`
2. Set `USE_MOCK_DATA = true` to use mock data
3. Set `USE_MOCK_DATA = false` to use the real API

## Mock Data Features

- 5 sample employees with various scenarios:
  - Employees with and without discounts (names starting with 'A' get 10% discount)
  - Employees with dependents
  - Employees without dependents
  - Dependents with discounts

- Simulated API delays (500ms by default) for realistic behavior

- Full CRUD operations supported:
  - Create employees
  - Delete employees
  - Create dependents
  - Delete dependents
  - Fetch employees and dependents

## Data Structure

### Employee
```javascript
{
  employeeId: number,
  firstName: string,
  lastName: string,
  benefitsCost: number,
  discount: number,
  dependents: Array<Dependent>
}
```

### Dependent
```javascript
{
  dependentId: number,
  firstName: string,
  lastName: string,
  relationship: string,
  benefitsCost: number,
  discount: number
}
```

