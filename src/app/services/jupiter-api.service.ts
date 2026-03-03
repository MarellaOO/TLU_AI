import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import type { CategoryApiResponse, FrontPageSection } from '../models/api.models';

const API_URL = 'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';

@Injectable({ providedIn: 'root' })
export class JupiterApiService {
  constructor(private http: HttpClient) {}

  getFrontPageRibbons(): Observable<FrontPageSection[]> {
    return this.http.get<CategoryApiResponse>(API_URL).pipe(
      map((res) => {
        const sections = res?.data?.category?.frontPage ?? [];
        return sections.filter(
          (s) =>
            s.highTimeline === true &&
            !(s.manual?.banner === true) &&
            Array.isArray(s.data) &&
            s.data.length > 0
        );
      })
    );
  }

  /** Esilehe bänner (esimene sektsioon, kus manual.banner === true). */
  getFrontPageBanner(): Observable<FrontPageSection | null> {
    return this.http.get<CategoryApiResponse>(API_URL).pipe(
      map((res) => {
        const sections = res?.data?.category?.frontPage ?? [];
        const banner = sections.find(
          (s) => s.manual?.banner === true && Array.isArray(s.data) && s.data.length > 0
        );
        return banner ?? null;
      })
    );
  }
}
