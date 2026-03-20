// importa o ASP.NET Core para usar as annotations de Controller
using Microsoft.AspNetCore.Mvc;

// importa a interface do Service e os DTOs
using clivros_api.Application;
using clivros_api.DTOs;

namespace clivros_api.Controllers
{
    // indica que esta classe é um Controller de API
    [ApiController]
    // define a rota base — todos os endpoints começam com /api/livros
    [Route("api/[controller]")]
    public class LivroController : ControllerBase
    {
        // declara a dependência do Service
        private readonly ILivroService _service;

        // construtor — recebe o Service via injeção de dependência
        public LivroController(ILivroService service)
        {
            _service = service;
        }

        // GET /api/livros — busca todos os livros
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var livros = await _service.GetAll();
            return Ok(livros);
        }

        // GET /api/livros/1 — busca um livro pelo id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var livro = await _service.GetById(id);
            if (livro == null) return NotFound();
            return Ok(livro);
        }

        // POST /api/livros — cria um novo livro
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateLivroDTO dto)
        {
            await _service.Create(dto);
            return Created("", dto);
        }

        // PUT /api/livros/1 — atualiza um livro existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateLivroDTO dto)
        {
            await _service.Update(id, dto);
            return NoContent();
        }

        // DELETE /api/livros/1 — remove um livro
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                // retorna 400 se tentar deletar livro ativo
                return BadRequest(ex.Message);
            }
        }
    }
}