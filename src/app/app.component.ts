import { Component, OnInit } from '@angular/core';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
