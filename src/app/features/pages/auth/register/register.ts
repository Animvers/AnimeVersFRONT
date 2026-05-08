import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { App } from '../../../../app';
import { ApiReponse } from '../../../../interfaces/api-reponse';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  showPassword = false;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$';

  constructor(
    private authService: AuthService,
    private router: Router,
    private app: App,
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister(form: NgForm) {
    let pseudo = form.value.RegisterPseudo;
    let email = form.value.RegisterEmail;
    let password = form.value.RegisterPassword;

    var bodynoJson = {
      pseudo: pseudo,
      email: email,
      password: password,
    };

    this.authService
      .register(bodynoJson, this.app.urlAPI())
      .subscribe((reponseRegister: ApiReponse) => {
        if (reponseRegister.status == 'ok') {
          alert('Bienvenue jeune shinigami suppléant');
          this.router.navigate(['/login']);
        }
      });
  }
}
