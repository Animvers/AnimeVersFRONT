import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { App } from '../app';

@Injectable({ providedIn: 'root' })
export class Anilist {
  private http = inject(HttpClient);

  // J'affiche tout les données de l'anime que je veut afficher sur ma page animeone
  getAnimeById(id: number): Observable<any> {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id idMal title { romaji english native }
          description(asHtml: false)
          startDate { year month day }
          endDate { year month day }
          season seasonYear type format status episodes duration chapters volumes
          genres synonyms averageScore meanScore popularity favourites source
          countryOfOrigin isAdult bannerImage
          coverImage { large medium }
          trailer { id site thumbnail }
          studios { nodes { id name } }
          characters(page: 1, perPage: 100) {
            nodes { id name { full } image { medium } }
          }
          nextAiringEpisode { airingAt episode timeUntilAiring }
          siteUrl
        }
      }
    `;

    return this.http
      .post<any>(App.url_API_DEV2, { query, variables: { id } })
      .pipe(map((res) => res.data.Media));
  }

  // avec media je références tout les ANIMES (animeall) avec le titre en ROMAJI, j'enleve tout les hentai,
  // je fait apelle a la const pour la popularité pour enlever tout les animes pas connu (voir com const popLimit)
  // puis la fonciton de search, genre, status et en fin j'enleve les format de con que personne ne regarde pour pas blinder les pages de merde.
  getAnimes(page: number = 1, perPage: number = 50, filters: any = {}): Observable<any> {
    const query = `
    query ($page: Int, $perPage: Int, $search: String, $genres: [String], $status: MediaStatus, $popularity: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { total currentPage lastPage hasNextPage }
        media( type: ANIME, sort: TITLE_ROMAJI, isAdult: false, popularity_greater: $popularity, search: $search, genre_in: $genres, status: $status, format_not_in: [OVA, SPECIAL, MUSIC]) {
          id
          title { romaji }
          coverImage { large }
        }
      }
    }`;

    // je fixe la limite de popularité a 0 si on sélectionne la catégorie "a venir" sinon pour afficher tout les animes je met a 5000
    // 5000 veut dire tout les animes ayant moin de 5000 personne qui l'on ajouter ce vois pas pour éviter d'afficher 1M d'anime pas connu mdr
    //   on est obliger de mettre a 0 pour "a venir" car sinon rien s'affiche logique NAN ? connard
    const popLimit = filters.status === 'NOT_YET_RELEASED' ? 0 : 5000;

    const variables = { page, perPage, search: filters.search || undefined, genres: filters.genres || undefined, status: filters.status || undefined, popularity: popLimit, };

    return this.http
      .post<any>(App.url_API_DEV2, { query, variables })
      .pipe(map((res) => res.data.Page));
  }
}
