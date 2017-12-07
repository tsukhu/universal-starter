import { Component, OnInit, Input } from '@angular/core';
import { AppState } from './common/services/app.service';
import { Router, NavigationStart } from '@angular/router';
import { UnlockService } from './common/services/unlock.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() public loading: boolean = false;

  public constructor(
    public appState: AppState,
    private router: Router,
    private unlockService: UnlockService
  ) {
    router.events
      .filter((event) => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        window.scrollTo(0, 0);
      });
  }

  public ngOnInit() {
    this.appState.set('Current Route', 'home page');
  }
}
