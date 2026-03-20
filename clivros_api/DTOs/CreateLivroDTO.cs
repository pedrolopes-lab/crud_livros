namespace clivros_api.DTOs
{
    public class CreateLivroDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string? Categoria { get; set; }
        public int TotalPaginas { get; set; }
        public bool Ativo { get; set; }
    }
}