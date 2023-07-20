using Moq;
using DataAccess.Repositories;
using DataAccess.Models;
using EshopBL;
using JWT;
using Microsoft.Extensions.Configuration;

namespace Tests;

public class RegisterTests
{
    [Fact]
    public void Register_Customer_Success()
    {
        // Arrange

        Customer fakeCustomerAccount = new Customer
        {
            Id = Guid.NewGuid(),
            Email = "",
            PasswordHash = ""
        };

        var mockRepo = new Mock<IAccountRepository>();
        mockRepo.Setup(repo => repo.GetByEmail("test@example.com"))
        .ReturnsAsync((Account?)null); // no user with this email exists
        mockRepo.Setup(repo => repo.Create(It.IsAny<Account>()))
            .ReturnsAsync(fakeCustomerAccount);

        var mockConfig = new Mock<IConfiguration>();
        mockConfig.SetupGet(x => x["JWT:Issuer"]).Returns("https://example.com");
        mockConfig.SetupGet(x => x["JWT:Audience"]).Returns("https://example.com");
        mockConfig.SetupGet(x => x["JWT:SecretKey"]).Returns("sampleKeyForDevelopmentPurposeOnly");
        mockConfig.SetupGet(x => x["salt"]).Returns("sampleSaltForDevelopmentPurposeOnly");

        JSONWebToken json = new JSONWebToken(mockConfig.Object);
        PasswordCrypto crypto = new PasswordCrypto(mockConfig.Object);


        AuthenticationService authservice = new AuthenticationService(json, mockRepo.Object, crypto);

        RegisterData input = new RegisterData
        {
            FirstName = "John",
            LastName = "Doe",
            Email = "test@example.com",
            Password = "password",
            Street = "123 Main St",
            City = "Anytown",
            State = "CA",
            PostalCode = "12345",
            PhoneNumber = "123-456-7890"
        };

        // Act
        // Register a new customer
        authservice.Register(input, "Customer").Wait();

        // Assert
        // Verify that the customer was created
        mockRepo.Verify(repo => repo.Create(It.IsAny<Account>()), Times.Once());
    }
}