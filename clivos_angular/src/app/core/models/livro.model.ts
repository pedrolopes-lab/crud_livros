



/*
Define a estrutura do objeto Livro no TypeScript — é o equivalente do Livro.cs do backend. 
Garante que em todo o frontend o objeto Livro sempre tenha os mesmos campos e tipos. 
É a "forma" que o Angular espera receber da API.
*/


// define a estrutura do objeto Livro no frontend
// deve espelhar o LivroResponseDTO do backend
export interface Livro {
  id: number;
  nome: string;
  autor: string;
  categoria?: string;  // opcional — o ? indica que pode ser nulo
  totalPaginas: number;
  ativo: boolean;
}

// define a estrutura para criar ou editar um livro
// deve espelhar o CreateLivroDTO do backend
export interface CreateLivro {
  nome: string;
  autor: string;
  categoria?: string;
  totalPaginas: number;
  ativo: boolean;
}