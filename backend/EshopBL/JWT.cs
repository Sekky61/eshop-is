using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JWT
{
    public class JSONWebToken
    {
        public SymmetricSecurityKey secretKey;
        public string issuer;
        public string audience;

        public JSONWebToken(IConfiguration cfg)
        {
            string? issuerCfg = cfg["JWT:Issuer"];
            string? audienceCfg = cfg["JWT:Audience"];
            string? secretKeyCfg = cfg["JWT:SecretKey"];

            if (issuerCfg == null || audienceCfg == null || secretKeyCfg == null)
            {
                throw new Exception("JWT not set in appsettings.json");
            }

            issuer = issuerCfg;
            audience = audienceCfg;
            secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKeyCfg));
        }

        // Generate a new token
        // If userId is null, the token is for an AnonymousCustomer
        public string GenerateToken(Guid userId, string role)
        {
            var claims = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Role, role)
                });

            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, userId.ToString()));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}