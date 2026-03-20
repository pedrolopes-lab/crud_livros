/*Intercepta automaticamente todas as requisições HTTP que saem do Angular para a API. Sua função é anexar o token JWT em cada 
requisição, sem que você precise fazer isso manualmente em cada chamada. É como um funcionário que carimba todos os documentos 
antes de enviá-los.*/

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// intercepta todas as requisições HTTP e anexa o token JWT
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // se tiver token, anexa no cabeçalho da requisição
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq); // envia a requisição com o token
  }

  return next(req); // envia a requisição sem o token se não estiver logado
  };