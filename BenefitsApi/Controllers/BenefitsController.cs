using BenefitsApi.Repositories;
using BenefitsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BenefitsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BenefitsController : ControllerBase
    {
        private readonly IBenefitsRepository _benefitsRepo;
        private readonly IBenefitsService _benefitsService;

        public BenefitsController(IBenefitsRepository benefitsRepo, IBenefitsService benefitsService)
        {
            _benefitsRepo = benefitsRepo ?? throw new ArgumentNullException(nameof(benefitsRepo));
            _benefitsService = benefitsService ?? throw new ArgumentNullException(nameof(benefitsService));
        }

        [HttpGet]
        public async Task<IActionResult> GetBenefitDetails()
        {
            try
            {
                var benefits = await _benefitsRepo.GetDetails();
                return Ok(benefits);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
    }
}
