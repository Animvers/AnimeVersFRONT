import { Routes } from '@angular/router';
import { Err } from './features/components/err/err';
import { Home } from './features/pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: '**', component: Err },
];
