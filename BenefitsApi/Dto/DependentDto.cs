namespace BenefitsApi.Dto
{
    public class DependentDto
    {
        //what will the user enter into the form
        public int EmployeeId { get; set; } //will be discovered and passed in through UI logic
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Relationship { get; set; }

    }
}
