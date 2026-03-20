

/*  cenários abordados no código abaixo:
*GetAll()     → cenário: buscar todos os livros
GetById()    → cenário: buscar um livro específico
Create()     → cenário: cadastrar um novo livro
Update()     → cenário: editar um livro existente
Delete()     → cenário: remover um livro
*/

/*1. recebe os dados (id ou DTO)
2. busca no banco via Repository
3. aplica a regra se houver
4. executa a operação
5. retorna o resultado
*/


// importa as classes do Domain (Livro, ILivroRepository)
using clivros_api.Domain;

// importa as classes dos DTOs (CreateLivroDTO, LivroResponseDTO)
using clivros_api.DTOs;

namespace clivros_api.Application
{
    // LivroService implementa o contrato definido em ILivroService
    public class LivroService : ILivroService
    {
        // declara a dependência do Repository — readonly = não pode ser substituído depois
        private readonly ILivroRepository _repository;

        // construtor — recebe o Repository via injeção de dependência
        public LivroService(ILivroRepository repository)
        {
            _repository = repository;
        }

        // busca todos os livros no banco e converte cada um para DTO de saída
        public async Task<IEnumerable<LivroResponseDTO>> GetAll()
        {
            var livros = await _repository.GetAll();
            return livros.Select(l => new LivroResponseDTO
            {
                Id = l.Id,
                Nome = l.Nome,
                Autor = l.Autor,
                Categoria = l.Categoria,
                TotalPaginas = l.TotalPaginas,
                Ativo = l.Ativo
            });
        }

        // busca um livro pelo id — retorna null se não encontrar
        public async Task<LivroResponseDTO?> GetById(int id)
        {
            var livro = await _repository.GetById(id);
            if (livro == null) return null;

            // converte a entidade para DTO de saída
            return new LivroResponseDTO
            {
                Id = livro.Id,
                Nome = livro.Nome,
                Autor = livro.Autor,
                Categoria = livro.Categoria,
                TotalPaginas = livro.TotalPaginas,
                Ativo = livro.Ativo
            };
        }

        // recebe DTO de entrada, converte para entidade e salva no banco
        public async Task Create(CreateLivroDTO dto)
        {
            var livro = new Livro
            {
                Nome = dto.Nome,
                Autor = dto.Autor,
                Categoria = dto.Categoria,
                TotalPaginas = dto.TotalPaginas,
                Ativo = dto.Ativo
            };
            await _repository.Create(livro);
        }

        // busca o livro pelo id, atualiza os campos com os dados do DTO e salva
        public async Task Update(int id, CreateLivroDTO dto)
        {
            var livro = await _repository.GetById(id);
            if (livro == null) return; // se não encontrar, não faz nada

            livro.Nome = dto.Nome;
            livro.Autor = dto.Autor;
            livro.Categoria = dto.Categoria;
            livro.TotalPaginas = dto.TotalPaginas;
            livro.Ativo = dto.Ativo;

            await _repository.Update(livro);
        }

        // regra de negócio: não pode deletar livro ativo
        public async Task Delete(int id)
        {
            var livro = await _repository.GetById(id);
            if (livro == null) return; // se não encontrar, não faz nada

            // verifica a regra antes de deletar
            if (livro.Ativo)
                throw new Exception("Não é permitido remover um livro ativo.");

            await _repository.Delete(id);
        }
    }
}




