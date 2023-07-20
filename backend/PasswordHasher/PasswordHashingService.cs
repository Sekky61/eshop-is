
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace PasswordHasher;

// This class is used to hash passwords
// It uses the salt from the configuration file (appsettings.json)
public class PasswordHashingService
{
    public byte[] salt;

    public PasswordHashingService(PasswordHasherConfig configuration)
    {
        string? saltString = configuration.SaltString;
        if (saltString == null)
        {
            throw new Exception("Salt not found in configuration");
        }

        salt = Encoding.UTF8.GetBytes(saltString);
    }

    public string HashPassword(string password)
    {
        // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password!,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        return hashed;
    }

    public bool VerifyPassword(string password, string passwordHash)
    {
        string hashed = HashPassword(password);
        return hashed == passwordHash;
    }
}