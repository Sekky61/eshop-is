namespace DataAccess.Repositories
{
    public interface IRepository<T>
    {
        Task<T?> GetById(Guid id);
        Task<IEnumerable<T>> GetAll();
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<bool> Delete(Guid id);
    }
}