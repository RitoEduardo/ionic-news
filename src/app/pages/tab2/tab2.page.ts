import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  news: Article[];
  segmentAcept: string;
  page: number;

  categories: {
    name: string,
    icon: string
  }[] = [
    {
      name: 'business',
      icon: 'briefcase'
    },
    {
      name: 'entertainment',
      icon: 'tv'
    },
    {
      name: 'general',
      icon: 'book'
    },
    {
      name: 'health',
      icon: 'medkit'
    },
    {
      name: 'science',
      icon: 'calculator'
    },
    {
      name: 'sports',
      icon: 'football'
    },
    {
      name: 'technology',
      icon: 'battery-charging'
    }
  ];

  constructor(
    private newsService: NewsService
  ) {
    this.page = 1;
  }

  ngOnInit() {
    this.segmentAcept = this.categories[0].name;
    this.newsService.getTopHeadLines( this.page, this.segmentAcept ).subscribe( resp => {
      this.news = resp.articles;
    });
  }

  segmentChanged( event ) {
    this.page = 1;
    this.news.length = 0;
    this.segmentAcept = event.detail.value;
    console.log( event.detail.value );
    this.loadNews();
  }

  loadData( event ) {
    ++this.page;
    console.log(  `Segment: ${ this.segmentAcept } , Page: ${ this.page } `);
    this.loadNews().then( r => {
      console.log( r );
      event.target.complete();
      if ( r === 'Success empty' ) {
        event.target.disabled = true;
      }
    }).catch( e => {
      console.log( e );
      event.target.complete();
    });
  }

  loadNews() {
    return new Promise( (resolve, reject) => {
      this.newsService.getTopHeadLines( this.page, this.segmentAcept  ).subscribe( resp => {
        if ( resp.articles.length === 0 ) {
          resolve('Success empty');
        }
        if ( resp.status !== 'ok' ) {
          reject(resp);
        }
        this.news.push( ...resp.articles );
        resolve('Success');
      });
    });
  }
}
