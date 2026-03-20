# 📚 CRUD Livros — Sistema de Gerenciamento de Livros

Sistema SPA Full-Stack para gerenciamento de livros com autenticação JWT.

---

## 🛠️ Tecnologias

### Frontend
- Angular 21+
- Angular Signals
- Reactive Forms
- Route Guards e HTTP Interceptors

### Backend
- .NET 10
- Entity Framework Core + MySQL
- JWT Authentication

---

## 📁 Estrutura do Projeto

```
crud_livros/
├── clivos_angular/         → Frontend Angular
│   └── src/app/
│       ├── core/
│       │   ├── guards/         → AuthGuard
│       │   ├── interceptors/   → AuthInterceptor
│       │   ├── models/         → Interfaces TypeScript
│       │   └── services/       → LivroService, AuthService
│       ├── features/
│       │   ├── login/          → Tela de login
│       │   └── books/          → Listagem e CRUD de livros
│       └── shared/
│           └── header/         → Header reutilizável
│
└── clivros_dotnetapi/      → Backend .NET
    ├── Controllers/            → AuthController, LivroController
    ├── Application/            → LivroService, ILivroService
    ├── Domain/                 → Livro, ILivroRepository
    ├── Infrastructure/         → LivroRepository, AppDbContext
    └── DTOs/                   → CreateLivroDTO, LivroResponseDTO
```

---

## ✅ Funcionalidades

- Login protegido por JWT
- Listagem de livros com filtro em tempo real por nome, autor e categoria
- Cadastro e edição de livros com validações
- Remoção de livros — **regra: não é permitido remover livro ativo**
- Rotas protegidas por Guard
- Token JWT anexado automaticamente via Interceptor

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js
- Angular CLI
- .NET SDK 10+
- MySQL Server

### 1. Inicie o backend

```bash
cd clivros_dotnetapi
dotnet run
```

### 2. Em outro terminal, inicie o frontend

```bash
cd clivos_angular
ng serve
```

### 3. Acesse no browser

```
http://localhost:4200
```

### 4. Credenciais de acesso

```
email: admin@admin.com
senha: admin123
```

---

## ⚠️ Observações

- O banco de dados é **MySQL** — certifique-se de que o serviço está rodando antes de iniciar o backend (`sudo systemctl start mysql`)
  ```

---

## 📏 Regras de Negócio

| Regra | Descrição |
|---|---|
| Remoção | Não é permitido remover um livro com status **Ativo** |
| Nome e Autor | Obrigatórios — máximo de 50 caracteres |
| Total de Páginas | Deve ser maior que 0 |
| Categoria | Opcional — dropdown com lista fixa |

---

## 🧱 Princípios Aplicados

- **SOLID** — Single Responsibility, Dependency Inversion
- **Clean Code** — nomes claros, responsabilidades bem definidas
- **Repository Pattern** — abstração do acesso ao banco
- **Injeção de Dependência** — IoC via .NET DI Container
