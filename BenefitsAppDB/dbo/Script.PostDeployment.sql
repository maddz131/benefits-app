if not exists (select 1 from dbo.[BenefitsDetails])
begin
	insert into dbo.[BenefitsDetails] (EmployeeBenefitsYearlyCost, DependentBenefitsYearlyCost, Paycheck, PayPeriodsPerYear, PercentDiscount)
	values (1000,500,2000,26,10)
end