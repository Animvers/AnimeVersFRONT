import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Navbar } from './features/components/navbar/navbar';
import { ApiReponse } from './models/api-reponse';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /************* Variable Global *************/
  APP_ENV: string = 'DEV';
  /* APP_ENV: string = 'PROD'; */

  url_API_DEV = 'http://localhost:8000';
  url_API_PROD = 'https://api-url';

  url_API_DEV2 = 'https://graphql.anilist.co';

  public currentUser: User | null = null;
  public currentToken: string = '';

  constructor(
    public authService: AuthService,
    private cookiesServices: CookieService,
    private router: Router,
  ) {
    const cookieToken: string = this.cookiesServices.get('AnimVersToken');

    if (cookieToken) {
      this.loginWithToken(cookieToken);
    }
  }

  /************* FUNCTION GLOBAL *************/
  urlAPI() {
    if (this.APP_ENV === 'DEV') {
      return this.url_API_DEV;
    } else {
      return this.url_API_PROD;
    }
  }

  createCORS(newToken: string | null = null) {

    var token: string;
    if (newToken) {
      token = newToken;
    } else {
      token = this.currentToken;
    }

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    var options = { headers: headers };

    return options;
  }

  /************* FUNCTION USER *************/
  loginWithToken(token: string) {
    this.authService
      .token(this.urlAPI(), this.createCORS(token))
      .subscribe((responseToken: ApiReponse) => {
        if (responseToken.status == 'ok') {
          this.currentUser = responseToken.result;

          if (this.currentUser) {
            this.currentToken = this.currentUser.token;
            this.authService.updateUser(this.currentUser);
          }
        }
      });
  }

  login(email: string, mdp: string) {
    var bodyNoJson = {
      email: email,
      password: mdp,
    };
    this.authService.login(bodyNoJson, this.urlAPI()).subscribe((reponseLogin: ApiReponse) => {
      if (reponseLogin.status == 'ok') {
        this.currentUser = reponseLogin.result;

        if (this.currentUser) {
          this.currentToken = this.currentUser.token;
          this.cookiesServices.set('AnimVersToken', this.currentToken);
          this.authService.updateUser(this.currentUser);
          this.router.navigate(['/']);
        }
      } else if (reponseLogin.status == 'error') {
      }
    });
  }

  logOut() {
    this.currentUser = null;
    this.currentToken = '';
    this.cookiesServices.delete('AnimVersToken');
  }
}
