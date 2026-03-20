using clivros_api.DTOs;

namespace clivros_api.Application
{
    public interface ILivroService
    {
        Task<IEnumerable<LivroResponseDTO>> GetAll();
        Task<LivroResponseDTO?> GetById(int id);
        Task Create(CreateLivroDTO dto);
        Task Update(int id, CreateLivroDTO dto);
        Task Delete(int id);
    }
}

/*diferenças em relação ao `ILivroRepository`:

- O Repository trabalha com a **entidade** `Livro`
- O Service trabalha com os **DTOs** — é ele que faz a conversão entre os dois
```
Frontend → DTO → Service → Livro (entidade) → Repository → Banco
Frontend ← DTO ← Service ← Livro (entidade) ← Repository ← Banco
*/