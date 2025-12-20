using BenefitsApi.Dto;
using BenefitsApi.Models;

namespace BenefitsApi.Repositories
{
    public interface IDependentRepository
    {
        public Task<IEnumerable<Dependent>> GetAll();
        public Task<IEnumerable<Dependent>> GetByEmployeeId(int id);
        public Task DeleteByEmployeeId(int id);
        public Task Add(DependentDto dependentDto);
        public Task Delete(int id);
    }
}
