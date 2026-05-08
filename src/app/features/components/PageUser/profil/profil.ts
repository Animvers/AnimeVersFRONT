import { ChangeDetectorRef, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App } from '../../../../app';
import { AuthService } from '../../../../services/auth';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ApiReponse } from '../../../../interfaces/api-reponse';
import { ProfilModel } from '../../../../interfaces/profil.model';

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
    // récupere le token
    const token = this.cookiesService.get('AnimVersToken');
    if (!token) return;

    // appelle du service
    this.userService
      .getProfil(this.app.urlAPI(), this.app.createCORS(token))
      .subscribe((reponse: ApiReponse) => {
        if (reponse.status === 'ok') {
          this.profil = reponse.result;

          // ca force Angular a afficher les données instante sans relaod la page
          this.cd.detectChanges();
        }
      });
  }

  openEditModal() {
    this.isEditModalOpen = true;
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveProfil() {
    const token = this.cookiesService.get('AnimVersToken');
    if (!token) return;

    // utilisation de FormData a la place de bodyJSON
    const formData = new FormData();
    formData.append('bio', this.tempbio);
    formData.append('pseudo', this.temppseudo);

    if (this.selectedFile) {
      formData.append('imageProfil', this.selectedFile, this.selectedFile.name);
    }

    this.userService
      // On passe plus le token avec this.app.createCORS(token) car c'est plus BodyJson dans le user.services.ts mais FormData
      .update(formData, this.app.urlAPI(), token) // ici
      .subscribe((reponse: ApiReponse) => {
        if (reponse.status === 'ok') {
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
