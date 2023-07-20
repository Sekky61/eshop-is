
namespace API.Schema.Mutations
{
    // Client should use this token from now on
    // Clients next step is to query for the customer
    public class SessionInfo
    {
        public string Token { get; set; } = null!;
    }
}