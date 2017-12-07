import { Component } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AppState } from '../services/app.service';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public cms: any;

  constructor(private appState: AppState) {
    this.cms = this.appState.get('unlockDevice');
  }

  public changeLanguage() {
    localStorage.unlockapplang =
      localStorage.unlockapplang === 'es' ? 'en' : 'es';
    location.reload(true);
  }
}
