CREATE TABLE [dbo].[Employee]
(
	[EmployeeID] INT IDENTITY(1,1) PRIMARY KEY,
	[FirstName] nvarchar(50) NOT NULL,
	[LastName] nvarchar(50) NOT NULL
)