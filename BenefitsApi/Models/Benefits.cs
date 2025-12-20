namespace BenefitsApi.Models
{
    public class Benefits
    {

        public int EmployeeBenefitsYearlyCost { get; set; }
        public int DependentBenefitsYearlyCost { get; set; }
        public int Paycheck { get; set; }
        public int PayPeriodsPerYear { get; set; }
        public int PercentDiscount { get; set; }
        public int Salary => Paycheck * PayPeriodsPerYear;
    }
}
