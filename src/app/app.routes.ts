import { Routes } from '@angular/router';
import { Err } from './features/components/err/err';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/auth/login/login';
import { Register } from './features/pages/auth/register/register';
import { User } from './features/pages/users/user/user';
import { AnimeoneComponent } from './features/pages/animeone/animeOne';
import { AnimeAllComponent } from './features/pages/animeall/animeAll';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user', component: User },
  { path: 'animes', component: AnimeAllComponent },
  { path: 'anime/:id', component: AnimeoneComponent },
  { path: '**', component: Err },
];
