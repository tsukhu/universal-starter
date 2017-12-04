import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class UnlockStatusService {

  //baseUrl: string = "https://www.att.com/";
  //unlockOrderStatusUrl: string = "apis/deviceunlock/UnlockOrder/unlockOrderStatus";
  baseUrl: string = "";
  unlockOrderStatusUrl: string = "../assets/content/unlock-status.json";

  constructor(private http: HttpClient) { }

  public UnlockDevice() {
    return this.http.get('../assets/content/unlock.json')
      .map(data => {
        return data;
      });
  }


  unlockOrderStatus() {
    // let header: HttpHeaders = new HttpHeaders();
    // header.append('Content-Type', 'application/json'); 
    // header.append('Access-Control-Allow-Origin', '*');

    return this.http.get(this.baseUrl + this.unlockOrderStatusUrl, {})//, {headers: header})
      .map((response: Response) => {
        return response;
      })
      .catch((error: any) => Observable.throw('Server error'));

  }

}
