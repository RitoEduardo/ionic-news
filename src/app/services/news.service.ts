import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Responses } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) {  }

  getTopHeadLines() {
    return this.http.get<Responses>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=6bca1be9a421444f8ed6eef8bcae2691`);
  }
}
