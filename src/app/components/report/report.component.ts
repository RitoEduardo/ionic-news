import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  @Input() index: number;
  @Input() article: Article;

  constructor(
    private iab: InAppBrowser
  ) { }

  ngOnInit() {}

  openURI( url: string ) {
    console.log( 'Open URL', url );
    const browser = this.iab.create(url, '_system');
    // browser.close();
  }

}
