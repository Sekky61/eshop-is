using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FileStorageService;
using System.Web;
using EshopBL;

namespace Server.Controllers
{
    public interface IFileUploadController
    {
        string GeneratePresignedUrl(Guid merchandiseId);
        IActionResult GetFile(string fileName);
        Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromQuery] string merchandiseId);
    }

    [ApiController]
    [Route("[controller]")]
    public class FileUploadController : ControllerBase, IFileUploadController
    {
        private readonly IFileStorageService _fileStorageService;

        private readonly MerchandiseService _merchandiseService;

        private readonly string _appBaseUrl;

        public FileUploadController(IFileStorageService fileStorageService, MerchandiseService merchandiseService, string appBaseUrl)
        {
            _fileStorageService = fileStorageService;
            _appBaseUrl = appBaseUrl;
            _merchandiseService = merchandiseService;
        }

        // controller is mapped to the /FileUpload endpoint
        // POST request to http://localhost:5024/FileUpload with a multipart/form-data body containing a file.
        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromQuery] string merchandiseId)
        {
            if (merchandiseId == null)
            {
                return BadRequest("merchandiseId is null");
            }

            var fileData = await GetFileData(file);
            var fileName = $"{Guid.NewGuid()}{System.IO.Path.GetExtension(file.FileName)}";
            var filePath = await _fileStorageService.SaveFileAsync(fileData, fileName, file.ContentType);

            // File is created. Now we can update the merchandise with the image url.

            var NewImageUri = GetFileUrl(fileName);

            await _merchandiseService.AddImageToMerchandise(new Guid(merchandiseId), new DataAccess.Models.ImageUri { Uri = NewImageUri });

            return Ok(NewImageUri);
        }

        public string GetFileUrl(string fileName)
        {
            var urlBuilder = new UriBuilder(_appBaseUrl)
            {
                Path = $"/FileUpload/files/{fileName}"
            };

            return urlBuilder.Uri.AbsoluteUri;
        }

        [HttpGet("files/{fileName}")]
        public IActionResult GetFile(string fileName)

        {
            Console.WriteLine("GetFile called for file: " + fileName);
            var filePath = System.IO.Path.Combine(_fileStorageService.GetDirectoryPath(), fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileStream = System.IO.File.OpenRead(filePath);
            return new FileStreamResult(fileStream, "application/octet-stream");
        }

        private async Task<byte[]> GetFileData(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }

        // Generate a presigned URL for the client to upload a file to.
        // Using the presigned URL, the client can upload a file directly to the storage service.
        public string GeneratePresignedUrl(Guid merchandiseId)
        {
            var urlBuilder = new UriBuilder(_appBaseUrl)
            {
                Path = "/FileUpload",
                Query = $"merchandiseId={HttpUtility.UrlEncode(merchandiseId.ToString())}"
            };

            return urlBuilder.Uri.AbsoluteUri;
        }

    }
}
