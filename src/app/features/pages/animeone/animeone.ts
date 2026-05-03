import { Component, OnInit, inject, signal } from '@angular/core';
import { Anilist } from '../../../services/anilist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animeone',
  standalone: true,
  templateUrl: './animeone.html',
  styleUrls: ['./animeone.css'],
})
export class AnimeoneComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private anilistService = inject(Anilist);

  public anime = signal<any>(null);
  public loading = signal(true);
  public currentPage:number = 1;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fetchAnime(id);
    }
  }

  fetchAnime(id: number) {
    this.loading.set(true);
    this.anilistService.getAnimeById(id).subscribe({
      next: (data) => {
        this.anime.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
