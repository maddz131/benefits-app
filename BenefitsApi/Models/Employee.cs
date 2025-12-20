namespace BenefitsApi.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<Dependent> Dependents { get; set; }
        public int BenefitsCost { get; set; }
        public int Discount { get; set; } //should this be here or just be discount?

    }
}
