import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../common/services/app.service';

@Component({
  selector: 'home',
  template: `<h3>{{ message }}</h3>`
})
export class HomeComponent implements OnInit {
  public message: string;

  public constructor(public appState: AppState) { }

  ngOnInit() {
    this.message = 'Hello';
    this.appState.set('Current Route', 'home page');
  }
}