import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class UnlockService {

  constructor(private http: HttpClient) { }

  public UnlockDevice() {
   return this.http.get('../assets/content/unlock.json')
      .map(data => {
        return  data;
      });
  }
}
