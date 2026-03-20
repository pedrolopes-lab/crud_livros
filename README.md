CRUD Livros — Sistema de Gerenciamento de Livros
Sistema SPA Full-Stack para gerenciamento de livros com autenticação JWT.
Tecnologias
Frontend

Angular 21+
Angular Signals
Reactive Forms
Route Guards e HTTP Interceptors

Backend

.NET 10
Entity Framework Core (InMemory)
JWT

Estrutura do Projeto
crud_livros/
├── clivos_angular/          → Frontend Angular
│   └── src/app/
│       ├── core/
│       │   ├── guards/      → AuthGuard
│       │   ├── interceptors/→ AuthInterceptor
│       │   ├── models/      → interfaces TypeScript
│       │   └── services/    → LivroService, AuthService
│       ├── features/
│       │   ├── login/       → tela de login
│       │   └── books/       → listagem e CRUD de livros
│       └── shared/
│           └── header/      → header reutilizável
└── clivros_api/             → Backend .NET
    ├── Controllers/         → AuthController, LivroController
    ├── Application/         → LivroService, ILivroService
    ├── Domain/              → Livro, ILivroRepository
    ├── Infrastructure/      → LivroRepository, AppDbContext
    └── DTOs/                → CreateLivroDTO, LivroResponseDTO
Funcionalidades

Login protegido por JWT
Listagem de livros com filtro em tempo real por nome, autor e categoria
Cadastro e edição de livros com validações
Remoção de livros — regra: não é permitido remover livro ativo
Rotas protegidas por Guard
Token JWT anexado automaticamente via Interceptor

Como Executar
Pré-requisitos

Node.js
Angular CLI
.NET SDK 10+

1. Inicia o backend:
bashcd clivros_api
dotnet run
2. Em outro terminal, inicia o frontend:
bashcd clivos_angular
ng serve
```

**3. Acessa no browser:**
```
http://localhost:4200
```

**4. Credenciais:**
```
email: admin@admin.com
senha: admin123
Observações

O banco de dados é InMemory — os dados são perdidos ao reiniciar o servidor
Para popular o banco use o Postman com POST para http://localhost:5013/api/Livro

Regras de Negócio

Não é permitido remover um livro com status Ativo
Nome e Autor são obrigatórios — máximo 50 caracteres
Total de Páginas deve ser maior que 0
Categoria é opcional — dropdown com lista fixa

Princípios Aplicados

SOLID — Single Responsibility, Dependency Inversion
Clean Code — nomes claros, responsabilidades bem definidas
Repository Pattern — abstração do acesso ao banco
Injeção de Dependência — IoC via .NET DI Container