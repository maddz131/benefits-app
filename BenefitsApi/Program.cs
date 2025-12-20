using BenefitsApi.Context;
using BenefitsApi.Repositories;
using BenefitsApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(c =>
{
    //Enable CORS
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddSingleton<DapperContext>();

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddScoped<IDependentRepository, DependentRepository>();

builder.Services.AddScoped<IBenefitsRepository, BenefitsRepository>();

builder.Services.AddScoped<IBenefitsService, BenefitsService>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline
//Enable CORS
app.UseCors(options=>options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
