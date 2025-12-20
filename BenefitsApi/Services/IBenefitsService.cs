using BenefitsApi.Dto;
using BenefitsApi.Models;

namespace BenefitsApi.Services
{
    public interface IBenefitsService
    {
        public Task<IEnumerable<Dependent>> GetDependents(int id);
        public Task<IEnumerable<Employee>> GetEmployees();
        public Task DeleteEmployee(int id);
    }
}
