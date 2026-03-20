/*
É o responsável por toda a comunicação com a API do backend. Centraliza todas as chamadas HTTP em um único lugar — buscar livros, 
criar, editar e deletar. Os componentes Angular não falam diretamente com a API — eles pedem ao Service que faça isso. 
É o equivalente do LivroRepository do backend, mas no frontend.*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro, CreateLivro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  // URL base da API
  private apiUrl = 'http://localhost:5013/api/Livro';

  // recebe o HttpClient via injeção de dependência
  constructor(private http: HttpClient) {}

  // GET /api/Livro — busca todos os livros
  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  // GET /api/Livro/1 — busca um livro pelo id
  getById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  // POST /api/Livro — cria um novo livro
  create(livro: CreateLivro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  // PUT /api/Livro/1 — atualiza um livro existente
  update(id: number, livro: CreateLivro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, livro);
  }

  // DELETE /api/Livro/1 — remove um livro
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}