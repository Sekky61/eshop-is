namespace FileStorageService;

public interface IFileStorageService
{
    Task<string> SaveFileAsync(byte[] fileData, string fileName, string fileType);
    Task<byte[]> GetFileAsync(string fileUrl);

    string GetDirectoryPath();
}
