using BenefitsApi.Context;
using BenefitsApi.Models;
using Dapper;

namespace BenefitsApi.Repositories
{
    public class BenefitsRepository : IBenefitsRepository
    {
        private readonly DapperContext _context;
        public BenefitsRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<Benefits> GetDetails()
        {
            var query = "SELECT * FROM BenefitsAppDB.dbo.BenefitsDetails";
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleAsync<Benefits>(query);
            }
        }
    }
}
