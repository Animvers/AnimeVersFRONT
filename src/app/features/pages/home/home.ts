import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { App } from '../../../app';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  constructor(
    private app: App,
    private cookieService: CookieService,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }
}
