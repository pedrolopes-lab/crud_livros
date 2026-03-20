/*esponsável por toda a autenticação do sistema — login, logout e armazenamento do token JWT. É ele que sabe se o usuário está logado
 ou não. Os Guards e Interceptors dependem dele para funcionar.*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base da API de autenticação
  private apiUrl = 'http://localhost:5013/api/Auth';

  // chave usada para salvar o token no localStorage
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // POST /api/Auth/login — envia email e senha, recebe o token JWT
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        // salva o token no localStorage após login bem sucedido
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  // remove o token do localStorage — desloga o usuário
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // retorna o token salvo
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}