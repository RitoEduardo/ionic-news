import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  @Input() index: number;
  @Input() article: Article;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {}

  openURI( url: string ) {
    console.log( 'Open URL', url );
    const browser = this.iab.create(url, '_system');
    // browser.close();
  }

  async launchMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.article.title,
            this.article.source.name,
            '',
            this.article.url
          ).then( () => {
            // Sharing is possible
          }).catch(() => {
            // Sharing is not possible
          });
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
