import { Component, OnInit, inject, signal } from '@angular/core';
import { Anilist } from '../../../services/anilist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animeall',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animeall.html',
  styleUrls: ['./animeall.css'],
})
export class AnimeAllComponent implements OnInit {
  private anilistService = inject(Anilist);

  public animes = signal<any[]>([]);
  public currentPage = signal(1);
  public loading = signal(true);

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.loading.set(true);
    this.anilistService.getAnimes(page).subscribe({
      next: (data) => {
        this.animes.set(data.media);
        this.currentPage.set(data.pageInfo.currentPage);
        this.loading.set(false);
      },
    });
  }
}
