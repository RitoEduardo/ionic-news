import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor( private storage: Storage ) {
    this.loadData();
  }

  savedNews( news: Article ) {
    const exist = this.news.find( r => r.title === news.title );
    if ( exist ) { console.log('Noticia agregada anteriormente'); return; }
    this.news.unshift( news );
    this.storage.set('favorites', this.news );
  }

  removeNews( news: Article ){
    const exist = this.news.findIndex( r => r.title === news.title );
    if ( exist === -1 ) { console.log('No se puede eliminar', exist ); return; }
    this.news.splice( exist, 1 );
    this.storage.set('favorites', this.news );
  }

  async loadData() {
    const news = await this.storage.get('favorites');
    this.news = news ? news : [];
  }

}
