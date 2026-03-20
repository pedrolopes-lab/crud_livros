/*Verifica se o usuário está logado antes de permitir acesso a uma página. Se não estiver logado,
 redireciona para a tela de login automaticamente. Depende do AuthService para verificar se o token existe.*/

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// redireciona para login se não estiver autenticado
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // verifica se o usuário está logado
  if (authService.isLoggedIn()) {
    return true; // permite acesso à rota
  }

  // redireciona para login se não estiver logado
  router.navigate(['/login']);
  return false; // bloqueia acesso à rota
};