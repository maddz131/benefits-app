using BenefitsApi.Models;

namespace BenefitsApi.Repositories
{
    public interface IBenefitsRepository
    {
        public Task<Benefits> GetDetails();
    }
}
