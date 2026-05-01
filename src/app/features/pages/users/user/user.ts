import { Component } from '@angular/core';
import { Profil } from '../../../components/profil/profil';

@Component({
  selector: 'app-user',
  imports: [ Profil],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {}
