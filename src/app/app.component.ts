import { Component, OnInit, Input } from '@angular/core';
import { AppState } from './common/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() loading: boolean = false;

  public constructor( public appState: AppState) {

  }

  public ngOnInit() {
    this.appState.set('Current Route','home page');
    this.appState.set('unlockDevice', '');
  }
}
