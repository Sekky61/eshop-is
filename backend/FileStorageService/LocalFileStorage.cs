namespace FileStorageService;
public class LocalFileStorage : IFileStorageService
{
    private readonly string _fileStoragePath;

    public LocalFileStorage(string fileStoragePath)
    {
        _fileStoragePath = fileStoragePath;

        // Create the directory if it doesn't exist
        if (!Directory.Exists(_fileStoragePath))
        {
            Directory.CreateDirectory(_fileStoragePath);
        }
    }

    public async Task<string> SaveFileAsync(byte[] fileData, string fileName, string fileType)
    {
        var filePath = Path.Combine(_fileStoragePath, fileName);
        await File.WriteAllBytesAsync(filePath, fileData);
        return filePath;
    }

    public async Task<byte[]> GetFileAsync(string fileUrl)
    {
        var fileName = Path.GetFileName(fileUrl);
        var filePath = Path.Combine(_fileStoragePath, fileName);
        return await File.ReadAllBytesAsync(filePath);
    }

    public string GetDirectoryPath()
    {
        return _fileStoragePath;
    }
}

