import { Routes } from '@angular/router';
import { Err } from './features/err/err';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '**', component: Err},
  { path: '', component: Home},
];
