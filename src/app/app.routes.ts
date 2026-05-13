import { Router, Routes } from '@angular/router';
import { Err } from './features/components/err/err';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/auth/login/login';
import { Register } from './features/pages/auth/register/register';
import { User } from './features/pages/users/user/user';
import { AnimeoneComponent } from './features/pages/animeone/animeOne';
import { AnimeAllComponent } from './features/pages/animeall/animeAll';
import { Admin } from './features/pages/users/admin/admin';
import { PollCreateComponent } from './features/components/Polls/poll/CreatePoll';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user', component: User },
  { path: 'admin', component: Admin },
  { path: 'animes', component: AnimeAllComponent },
  { path: 'anime/:id', component: AnimeoneComponent },
  { path: 'poll', component: PollCreateComponent },
  { path: '**', component: Err },
];
