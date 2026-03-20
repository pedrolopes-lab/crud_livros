/* Arquivo de configuração principal do Angular equivalente ao Program.cs do backend. Onde são registrados os "providers
 globais" ( provedores gerais da aplicação, não apenas um componente) como o HttpClient e o Interceptor.*/


import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // registra as rotas da aplicação
    provideRouter(routes),
    // registra o HttpClient com o interceptor de autenticação
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
