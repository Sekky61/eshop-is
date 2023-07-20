using DataAccess.Models;
using DataAccess.Repositories;

namespace EshopBL;

public class MerchandiseService
{
    private readonly IMerchandiseRepository _merchandiseRepository;

    public MerchandiseService(IMerchandiseRepository merchandiseRepository)
    {
        _merchandiseRepository = merchandiseRepository;
    }

    public async Task<IEnumerable<Merchandise>> GetMerchandise()
    {
        IEnumerable<Merchandise> merchandise = await _merchandiseRepository.GetAll();

        return merchandise;
    }

    public async Task<Merchandise?> GetMerchandiseById(Guid id)
    {
        Merchandise? merchandise = await _merchandiseRepository.GetById(id);

        return merchandise;
    }

    public async Task<Merchandise> Create(Merchandise merchandise)
    {
        merchandise = await _merchandiseRepository.Create(merchandise);

        return merchandise;
    }

    public async Task<Merchandise> Update(Merchandise merchandise)
    {
        merchandise = await _merchandiseRepository.Update(merchandise);

        return merchandise;
    }

    public async Task<bool> Delete(Guid id)
    {
        return await _merchandiseRepository.Delete(id);
    }

    // Add image to merchandise
    public async Task<Merchandise> AddImageToMerchandise(Guid merchandiseId, ImageUri imageUri)
    {
        if (imageUri == null)
        {
            throw new ArgumentNullException(nameof(imageUri));
        }

        Merchandise? merchandise = await _merchandiseRepository.GetById(merchandiseId);

        if (merchandise == null)
        {
            throw new ArgumentNullException(nameof(merchandise));
        }

        if (merchandise.Images == null)
        {
            // Should not happen, but just in case
            merchandise.Images = new List<ImageUri>();
        }

        merchandise.Images.Add(imageUri);

        await _merchandiseRepository.Update(merchandise);

        return merchandise;
    }

    public async Task<List<string>> GetImagesUri(Guid id)
    {
        Merchandise? merchandise = await _merchandiseRepository.GetById(id);

        if (merchandise == null)
        {
            throw new Exception("Merchandise not found");
        }

        if (merchandise.Images == null)
        {
            throw new Exception("Merchandise has no images");
        }

        return merchandise.Images.Select(i => i.Uri).ToList();
    }
}
