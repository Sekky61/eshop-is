namespace DataAccess.Models
{
    public class ImageUri
    {
        public Guid Id { get; set; }
        public string Uri { get; set; } = null!;

        public Guid MerchandiseId { get; set; }
        public Merchandise Merchandise { get; set; } = null!;

        public ImageUri() { }

        // constructor
        public ImageUri(string uri)
        {
            Uri = uri;
        }
    }
}