namespace clivros_api.Domain
{
   public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetAll();
        Task<Livro?> GetById(int id);
        Task Create(Livro livro);
        Task Update(Livro livro);
        Task Delete(int id);
    }
}   
