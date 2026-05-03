import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { App } from '../app';

@Injectable({ providedIn: 'root' })
export class Anilist {
  private http = inject(HttpClient);


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


  getAnimes(page: number = 1, perPage: number = 50): Observable<any> {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo { total currentPage lastPage hasNextPage }
          media(type: ANIME, sort: TITLE_ROMAJI, isAdult: false, popularity_greater: 5000, duration_greater: 10) {
            id
            title { romaji }
            coverImage { large }
          }
        }
      }`;

    return this.http
      .post<any>(App.url_API_DEV2, { query, variables: { page, perPage } })
      .pipe(map((res) => res.data.Page));
  }
}
