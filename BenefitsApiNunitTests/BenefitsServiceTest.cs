using BenefitsApi.Services;
using BenefitsApi.Repositories;
using NSubstitute;
using NUnit.Framework;
using BenefitsApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;

namespace BenefitsApiNunitTests;

public class BenefitsServiceTests
{
    private IDependentRepository _dependentRepo;
    private IEmployeeRepository _employeeRepo;
    private IBenefitsRepository _benefitsRepo;
    private BenefitsService _benefitsService;

    [SetUp]
    public void Setup()
    {
        _dependentRepo = Substitute.For<IDependentRepository>();
        _employeeRepo = Substitute.For<IEmployeeRepository>();
        _benefitsRepo = Substitute.For<IBenefitsRepository>();
        _benefitsService = new BenefitsService(_employeeRepo, _dependentRepo, _benefitsRepo);
    }

    [Test]
    public async Task Test_Get_Dependents()
    {
        //setup
        var dependent = new Dependent();
        dependent.EmployeeId = 2;
        dependent.FirstName = "Garret";

        var benefits = new Benefits();
        benefits.DependentBenefitsYearlyCost = 500;
        benefits.PercentDiscount = 10;

        List<Dependent> dependents = new List<Dependent>(){dependent};
        _dependentRepo.GetByEmployeeId(Arg.Any<int>()).Returns(dependents);
        _benefitsRepo.GetDetails().Returns(benefits);

        //check the method returns a list of dependents
        var result = await _benefitsService.GetDependents(dependent.EmployeeId);
        result.Should().BeEquivalentTo(dependents);

        //check that discount wasn't applied and benefits cost was applied
        Assert.AreEqual(0, dependent.Discount);
        Assert.AreEqual(500, dependent.BenefitsCost);

        //check that the correct repository is called
        await _dependentRepo.Received(1).GetByEmployeeId(dependent.EmployeeId);
    }

    [Test]
    public async Task Test_Get_Dependents_Applies_Discount()
    {
        //setup
        var dependent = new Dependent();
        dependent.EmployeeId = 2;
        dependent.FirstName = "Annie";

        var benefits = new Benefits();
        benefits.DependentBenefitsYearlyCost = 500;
        benefits.PercentDiscount = 10;

        List<Dependent> dependents = new List<Dependent>(){dependent};
        _dependentRepo.GetByEmployeeId(Arg.Any<int>()).Returns(dependents);
        _benefitsRepo.GetDetails().Returns(benefits);

        await _benefitsService.GetDependents(dependent.EmployeeId);

        //check that discount and benefits cost was applied
        Assert.AreEqual(50, dependent.Discount);
        Assert.AreEqual(500, dependent.BenefitsCost);
    }
}
