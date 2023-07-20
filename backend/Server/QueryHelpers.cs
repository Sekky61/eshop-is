using System.Security.Claims;

namespace Server.QueryHelpers
{
    public static class QueryHelpers
    {
        public static Guid? getIdFromClaims(ClaimsPrincipal claimsPrincipal)
        {
            if (claimsPrincipal.Identity == null)
            {
                throw new Exception("ClaimsPrincipal has no identity");
            }

            if (!claimsPrincipal.Identity.IsAuthenticated)
            {
                // Should not happen as the client should always get a JWT first
                return null;
            }

            string? idString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (idString == null)
            {
                // Id is not set on token, meaning the user is not logged in
                return null;
            }
            Guid id = Guid.Parse(idString);

            return id;
        }
    }
}