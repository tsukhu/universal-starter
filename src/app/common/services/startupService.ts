
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppState } from './app.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class StartupService {
  // data;

  constructor(public http: HttpClient, public appState: AppState) {}

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  public load(): Promise<any> {

    return this.http.get('../assets/content/unlock.json').map((data: any) => {
        const curLang = localStorage.unlockapplang || 'en';
        this.appState.set(
          'unlockDevice',
          data.unlockPortalLabelAndErrorObj[0][curLang]
        );
      }).toPromise()
      .catch((err: any) => Promise.resolve());
  }

}
