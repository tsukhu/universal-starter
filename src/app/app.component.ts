import { Component, OnInit, Input } from '@angular/core';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() loading: boolean = false;
  cities = ['Paris', 'London', 'San Francisco'];

  public ngOnInit() {
    WebFont.load({
      custom: {
        families: ['Helvetica',
        'Omnes-ATT-W02']
      },
      active: function() {
        sessionStorage.fonts = true;
      },
      timeout: 2000
    });
  }
}
