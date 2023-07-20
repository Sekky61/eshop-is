
using DataAccess.Repositories;

namespace API.Schema.Queries
{

    public class Query
    {
        // Example query
        public string Ping() => "Pong";

        public string Hello(string name) => $"Hello {name}";
    }
}