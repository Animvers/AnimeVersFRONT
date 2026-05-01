import { ChangeDetectorRef, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../services/user';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App } from '../../../../app';
import { AuthService } from '../../../../services/auth';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ApiReponse } from '../../../../models/api-reponse';
import { ProfilModel } from '../../../../models/profil.model';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css'],
})
export class Profil implements OnInit {
  //Pour MAJ profile
  isEditModalOpen: boolean | undefined;
  temppseudo: string = '';
  tempbio: string = '';
  tempimageProfil: Text | string = '';

  public profil: ProfilModel | null = null;

  constructor(
    private cookiesService: CookieService,
    public authService: AuthService,
    public app: App,
    private userService: UserService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // 1. On récupère le token
    const token = this.cookiesService.get('AnimVersToken');
    if (!token) return;

    // 2. On appelle le service pour charger la bio et l'image au démarrage
    this.userService
      .getProfil(this.app.urlAPI(), this.app.createCORS(token))
      .subscribe((reponse: ApiReponse) => {
        if (reponse.status === 'ok') {
          // reponse.result contient les données de ton API
          this.profil = reponse.result;

          // On force Angular à afficher les données maintenant
          this.cd.detectChanges();
        }
      });
  }

  openEditModal() {
    this.isEditModalOpen = true;
  }

  saveProfil() {
    const token = this.cookiesService.get('AnimVersToken');
    if (!token) return;

    const bodyJSON = {
      pseudo: this.temppseudo,
      bio: this.tempbio,
      imageProfil: this.tempimageProfil,
    };

    this.userService
      .update(bodyJSON, this.app.urlAPI(), this.app.createCORS(token))
      .subscribe((reponseUpdateAPI: ApiReponse) => {
        if (reponseUpdateAPI.status == 'ok') {
          window.location.reload();
        } else {
          alert('Erreur lors de la mise à jour');
        }
      });
  }

  updateUrl(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'favicon.ico';
  }
}
