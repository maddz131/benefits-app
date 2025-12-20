namespace BenefitsApi.Models
{
    public class Dependent
    {
        public int DependentId { get; set; }
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Relationship { get; set; }
        public int BenefitsCost { get; set; }
        public int Discount { get; set; }
    }
}
