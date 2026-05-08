import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { App } from '../../../../app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  constructor(
    public authService: AuthService,
    private router: Router,
    public app: App,
  ) {}

  onLogin(form: NgForm) {
    let email = form.value.loginEmail;
    let password = form.value.loginPassword;

    if (email && password) {
      this.app.login(email, password);
    }
  }
}
