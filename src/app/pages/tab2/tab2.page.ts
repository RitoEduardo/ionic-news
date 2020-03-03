import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  segmentAcept: string;
  news: Article[];

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
  }

  ngOnInit() {
    this.segmentAcept = this.categories[1].name;
  }

  segmentChanged( event ) {
    console.log( event.detail.value );
    this.newsService.getTopHeadLines( event.detail.value ).subscribe( resp => {
      this.news = resp.articles;
    });
  }

}
