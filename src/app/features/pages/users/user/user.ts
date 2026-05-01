import { Component } from '@angular/core';
import { Profil } from '../../../components/PageUser/profil/profil';
import { Favoris } from '../../../components/PageUser/favoris/favoris';

@Component({
  selector: 'app-user',
  imports: [Profil, Favoris],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {}
