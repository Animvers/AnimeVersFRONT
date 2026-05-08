import { Component, OnInit, inject, signal } from '@angular/core';
import { AnilistService } from '../../../services/anilist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animeone',
  standalone: true,
  templateUrl: './animeOne.html',
  styleUrls: ['./animeOne.css'],
})
export class AnimeoneComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private anilistService = inject(AnilistService);

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
