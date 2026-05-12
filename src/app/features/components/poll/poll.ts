import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PollService } from '../../../services/poll.service';
import { App } from '../../../app';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css'],
})
export class PollComponent {
  title: string = '';
  question: string = '';
  categoryName: string = '';
  choices: string[] = ['', '']; // deux champs vides au début
  selectedFile: File | null = null;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private pollService: PollService,
    public app: App,
  ) {}

// verif admin
  isAdmin(): boolean {
    const user = this.authService.currentUserSelect();
    return user?.role?.includes('ROLE_ADMIN') || false;
  }

// selection fichier
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

// ajout choix
  addChoice(): void {
    this.choices.push('');
  }


// envoi du formulaire
  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.isAdmin()) {
      alert("Action refusée : vous n'êtes pas administrateur.");
      return;
    }

    this.loading = true;

// construction du FormDATA ( requis pour les fichiers + text !! ( note dans l'API ) )
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('question', this.question);
    formData.append('category_name', this.categoryName);

// je filtre les choix vides ( pour ne pas a avoir a les stoker dans la BDD ) et je stringify
// ( je transform le tableau de choix en chaine de caractere et dans l'api on vas le json_decode pour le retransformer
// en véritable tableau PHP utilisable )
    const cleanChoices = this.choices.filter((c) => c.trim() !== '');
    formData.append('choices', JSON.stringify(cleanChoices));

    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile);
    }

// apelle de la fonction du pollService
    this.pollService.createSondage(formData, this.app.urlAPI(), this.app.currentToken).subscribe({
      next: (response) => {
        if (response.status === 'ok') {
          alert('Sondage créé avec succès !');
          this.resetForm();
        } else {
          alert('Erreur : ' + response.mesage);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur HTTP:', err);
        alert('Une erreur est survenue lors de la création.');
        this.loading = false;
      },
    });
  }

  private resetForm(): void {
    this.title = '';
    this.question = '';
    this.categoryName = '';
    this.choices = ['', ''];
    this.selectedFile = null;
  }
}
