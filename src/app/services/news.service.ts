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

  getTopHeadLines( category: string = null ) {
    let params = new HttpParams().set('country', 'mx');
    if ( category ) {
      params = params.set('category', category );
    }
    return this.http.get<Responses>(`${ URL }/top-headlines`, { headers, params });
  }

}
