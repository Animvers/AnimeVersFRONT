import { Routes } from '@angular/router';
import { Err } from './features/components/err/err';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/auth/login/login';
import { Register } from './features/pages/auth/register/register';
import { Profil } from './features/components/profil/profil';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user', component: Profil},
  { path: '**', component: Err },
];
