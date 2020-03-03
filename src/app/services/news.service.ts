import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Responses } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


const { apiKey, URL } = environment;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) {  }

  getTopHeadLines( page: number = -1, category: string = null ) {
    let params = new HttpParams().set('country', 'mx');
    if ( page > 1) {
      params = params.set('page', `${page}` );
    }
    if ( category ) {
      params = params.set('category', category );
    }
    return this.http.get<Responses>(`${ URL }/top-headlines`, { headers, params });
  }

}
