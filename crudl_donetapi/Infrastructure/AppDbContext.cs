// importa o Entity Framework
using Microsoft.EntityFrameworkCore;

// importa a entidade Livro
using clivros_api.Domain;

namespace clivros_api.Infrastructure
{
    // AppDbContext é o contexto do banco — representa o banco de dados no código C#
    public class AppDbContext : DbContext
    {
        // construtor — recebe as configurações via injeção de dependência
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // representa a tabela "Livros" no banco de dados
        public DbSet<Livro> Livros { get; set; }
    }
}