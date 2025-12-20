using BenefitsApi.Context;
using BenefitsApi.Dto;
using BenefitsApi.Models;
using Dapper;
using System.Data;

namespace BenefitsApi.Repositories
{
    //still need to add remove functions
    public class DependentRepository : IDependentRepository
    {
        private readonly DapperContext _context;
        public DependentRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Dependent>> GetAll()
        {
            var query = "SELECT * FROM BenefitsAppDB.dbo.Dependent";
            using (var connection = _context.CreateConnection())
            {
                var dependants = await connection.QueryAsync<Dependent>(query);
                return dependants.ToList();
            }
        }
        public async Task<IEnumerable<Dependent>> GetByEmployeeId(int id)
        {
            var query = "SELECT * FROM BenefitsAppDB.dbo.Dependent WHERE EmployeeID = @id";
            using (var connection = _context.CreateConnection())
            {
                var dependants = await connection.QueryAsync<Dependent>(query, new { id });
                return dependants.ToList();
            }
        }
        public async Task Add(DependentDto dependentDto)
        {
            var query = "INSERT INTO BenefitsAppDB.dbo.Dependent " +
                        "VALUES (@FirstName, @LastName, @Relationship," +
                        "@EmployeeID)";

            var parameters = new DynamicParameters();
            parameters.Add("FirstName", dependentDto.FirstName, DbType.String);
            parameters.Add("LastName", dependentDto.LastName, DbType.String);
            parameters.Add("EmployeeID", dependentDto.EmployeeId, DbType.Int32);
            parameters.Add("Relationship", dependentDto.Relationship, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
        public async Task DeleteByEmployeeId(int id)
        {
            var query = "DELETE FROM BenefitsAppDB.dbo.Dependent " +
            "WHERE EmployeeID = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
        public async Task Delete(int id)
        {
            var query = "DELETE FROM BenefitsAppDB.dbo.Dependent " +
            "WHERE DependentID = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
    }
}