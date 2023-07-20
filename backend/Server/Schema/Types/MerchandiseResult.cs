using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.DataAccess;
using HotChocolate;

namespace API.Schema.Types
{
    // Use the url to upload the images
    public class MerchandiseEditResult
    {
        public Guid Id { get; set; }
        public bool success { get; set; }
        public string Name { get; set; } = null!;
        public string ImageUploadUrl { get; set; } = null!;
    }
}