using BenefitsApi.Dto;
using BenefitsApi.Models;

namespace BenefitsApi.Repositories
{
    public interface IEmployeeRepository
    {
        public Task<IEnumerable<Employee>> GetAll();
        public Task Add(EmployeeDto employee); //ideally would return route to inserted item
        public Task Delete(int id);
    }
}
