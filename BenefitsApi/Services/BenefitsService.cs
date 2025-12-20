using BenefitsApi.Dto;
using BenefitsApi.Models;
using BenefitsApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace BenefitsApi.Services
{
    public class BenefitsService : IBenefitsService
    {

        private readonly IEmployeeRepository _employeeRepo;
        private readonly IDependentRepository _dependentRepo;
        private readonly IBenefitsRepository _benefitsRepo;

        public BenefitsService(IEmployeeRepository employeeRepo, IDependentRepository dependentRepo, IBenefitsRepository benefitsRepo)
        {
            _employeeRepo = employeeRepo ?? throw new ArgumentNullException(nameof(employeeRepo));
            _dependentRepo = dependentRepo?? throw new ArgumentNullException(nameof(dependentRepo));
            _benefitsRepo = benefitsRepo?? throw new ArgumentNullException(nameof(benefitsRepo));
        }

        private bool applyDiscount(string name)
        {
            if (!string.IsNullOrEmpty(name) && name[0].Equals('A'))
            {
                return true;
            }
            return false;
        }
        private int calculateDiscount(string name, int cost, int percentDiscount)
        {
            if (applyDiscount(name))
            {
                var multiplier = percentDiscount / (double)100;
                return (int)(cost * multiplier);
            }
            return 0;
        }
        public async Task<IEnumerable<Dependent>> GetDependents(int id)
        {
            var dependents = await _dependentRepo.GetByEmployeeId(id);
            var benefits = await _benefitsRepo.GetDetails();
            foreach (var dependent in dependents){
                dependent.BenefitsCost = benefits.DependentBenefitsYearlyCost;
                dependent.Discount = calculateDiscount(dependent.FirstName, benefits.DependentBenefitsYearlyCost, benefits.PercentDiscount);
            }
            return dependents;
        }
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _employeeRepo.GetAll();
            var benefits = await _benefitsRepo.GetDetails();
            foreach (var employee in employees)
            {
                employee.BenefitsCost = benefits.EmployeeBenefitsYearlyCost;
                employee.Dependents = await GetDependents(employee.EmployeeId);
                employee.Discount = calculateDiscount(employee.FirstName, benefits.EmployeeBenefitsYearlyCost, benefits.PercentDiscount);
            }
            return employees;
        }
        public async Task DeleteEmployee(int id)
        {
            await _dependentRepo.DeleteByEmployeeId(id);
            await _employeeRepo.Delete(id);
        }
    }
}
