// importa as classes do Domain (Livro, ILivroRepository)
using clivros_api.Domain;

// importa o Entity Framework para traduzir C# para SQL
using Microsoft.EntityFrameworkCore;

namespace clivros_api.Infrastructure
{
    // LivroRepository implementa o contrato definido em ILivroRepository
    public class LivroRepository : ILivroRepository
    {
        // contexto do banco de dados — é através dele que o EF acessa o banco
        private readonly AppDbContext _context;

        // construtor — recebe o contexto via injeção de dependência (regras de funcionamento)
        public LivroRepository(AppDbContext context)
        {
            _context = context;
        }

        // busca todos os livros no banco
        public async Task<IEnumerable<Livro>> GetAll()
        {
            return await _context.Livros.ToListAsync();
        }

        // busca um livro pelo id — retorna null se não encontrar
        public async Task<Livro?> GetById(int id)
        {
            return await _context.Livros.FindAsync(id);
        }

        // adiciona um novo livro no banco
        public async Task Create(Livro livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
        }

        // atualiza um livro existente no banco
        public async Task Update(Livro livro)
        {
            _context.Livros.Update(livro);
            await _context.SaveChangesAsync();
        }

        // remove um livro do banco pelo id
        public async Task Delete(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            if (livro != null)
            {
                _context.Livros.Remove(livro);
                await _context.SaveChangesAsync();
            }
        }
    }
}