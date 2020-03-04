import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  @Input() index: number;
  @Input() article: Article;
  @Input() showBtnDelete: boolean;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private actionSheetCtrl: ActionSheetController,
    private dataLocal: DataLocalService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  openURI( url: string ) {
    console.log( 'Open URL', url );
    const browser = this.iab.create(url, '_system');
    // browser.close();
  }

  async launchMenu() {

    const btns = [{
      text: 'Share',
      icon: 'share',
      handler: () => {
        console.log('Share clicked');
        this.sharedFunction();
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];

    if ( this.showBtnDelete ) {
      btns.push( {
        text: 'Delete Favorite',
        icon: 'trash',
        handler: () => {
          console.log('Favorite deleted clicked');
          this.dataLocal.removeNews( this.article );
          this.presentToast('Se elimino de Favoritos');
        }
      });
    } else { // Por defecto
      btns.push({
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocal.savedNews( this.article );
          this.presentToast('Se agrego a Favoritos');
        }
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: btns
    });
    await actionSheet.present();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      // position: 'top',
      duration: 2000
    });
    toast.present();
  }

  sharedFunction() {

    if ( this.platform.is('cordova') ) {
      return this.socialSharing.share(
        this.article.title,
        this.article.source.name,
        '',
        this.article.url
      );
    }
    if ( navigator['share'] ) {
      navigator['share']({
        title: this.article.title,
        text: this.article.description,
        url: this.article.url
      }).then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('El navegador no soporta el compartir ');
    }

    
  }
}
