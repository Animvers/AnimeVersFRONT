import { Component, OnInit, inject, signal } from '@angular/core';
import { Anilist } from '../../../services/anilist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animeall',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animeAll.html',
  styleUrls: ['./animeAll.css'],
})
export class AnimeAllComponent implements OnInit {
  private anilistService = inject(Anilist);

  public animes = signal<any[]>([]);
  public currentPage = signal(1);
  public loading = signal(true);

  public searchQuery = signal('');
  public selectedGenre = signal('');
  public selectedStatus = signal('');

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.loading.set(true);
    const filters = {
      search: this.searchQuery() || undefined,
      genres: this.selectedGenre() ? [this.selectedGenre()] : undefined,
      status: this.selectedStatus() || undefined,
    };

    this.anilistService.getAnimes(page, 50, filters).subscribe({
      next: (data) => {
        this.animes.set(data.media);
        this.currentPage.set(data.pageInfo.currentPage);
        this.loading.set(false);
      },
    });
  }

  applyFilters() {
    this.loadPage(1);
  }
}
