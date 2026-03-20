/* Define  as rotas da aplicação — quais URLs carregam quais componente. Équivale ao mapa de navegação do sistema e é 
onde se aplica  o Guard para proteger as rotas que precisam de autenticação. */



import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // rota padrão — redireciona para login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // rota de login — pública, qualquer um acessa
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },

  // rota de livros — protegida pelo Guard
  { path: 'books', loadComponent: () => import('./features/books/books.component').then(m => m.BooksComponent), canActivate: [authGuard] },
];
