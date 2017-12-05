import { RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { AppState } from "./app.service";

@Injectable()
export class UnlockService {
  baseUrl: string = "https://www.att.com/";
  redirectOCEWorkFlowUrl: string = "apis/deviceunlock/OCEUnlockOrder/redirectOCEWorkFlow";
  customerOrderFlow: string = "apis/deviceunlock/OCEUnlockOrder/orderFlow";
  validateEmailUrl: string = "apis/deviceunlock/UnlockUtility/Verify/ValidateEmail";

  constructor(private http: HttpClient, public appState: AppState) {}

  public UnlockDevice() {

    let dataState: any = this.appState.get('unlockDevice');
    if (dataState !== '') {
      return Observable.of(dataState).last();
    } else {
      return this.http.get("../assets/content/unlock.json").map((data: any) => {
        this.appState.set('unlockDevice', data.unlockPortalLabelAndErrorObj[0]);
        return data.unlockPortalLabelAndErrorObj[0];
      });
    }
  }

  orderFlow(customerNumber) {

    return this.http.get('../assets/content/orderflow-response.json');

    // let requestJson = {
    //   "orderFlowRequestDO": {
    //     "attCustomer": true,
    //     "currentFlow": "ACCOUNT_DETAILS_FLOW",
    //     "ctn": customerNumber,
    //     "reCaptcha": {
    //       "token": "03AO6mBfxTGRQLW3Hmrb8W3oEd6bOvAek28yG7Ur_w8NlhnWyUrVYinfWSZW0aurgqzPEdrUDo0UXPxkGiF2aXndlc1To_hpA0TA5o4pQAAG07G8vDCkNdkc9YTZvG3u-6Z8qIH0yLONJ9NEGnafG7CcodHoRWEk0DhaXbG_PRh7tQeksfl8m_52qhMiHod7tWnVMEdh4d6fyoEcTGaGdSBt73PM3_MzhPx4mpsdgNWWlyexteNumHIecjLjHao6KLeQ3WjNLQ9Kky3wnCiPQ3-UG0ATyosFiYP_VW9-_cZ_8vnp9QnGWGXSZA5GCoi8fl82mkSFbmQhzN",
    //       "tokenRefId": "sFkbjZOnJXoqv8DfNhy3%2B96%2FilS9hZ9WXzioZM3dBGbyBtEDr843KsnTrC3%2FDyL1kWWRTQs%2FydY8TNscNbvuy51zIDuuBxlO5Z6Lk8Aa7S%2BqDRAnXVSi%2FD0QoMbGRyFMmg7UKpmnj5STf1ZWqNzCdPdSQI6Az5XwkGORAQeoleiE9jCfPPzhJ2xcg0FyJQw35ndWGWErMh3SiyrD8PG70K7ynEoIz2ITOLzqcV0%2FdQD0es3yhBPRYlbS8%2FKVRawPXgzk28PkyjfHOYCwH8nRcD9TW215Wt%2FiQXE7LplsM8uPa%2FGn2HizC7CR5n1dZX5OgvDPcx7Ttvc6AFFcTuJmIyEM2KKs7at3vcNp1EwR3k9nIOUYwtCA7cOzokhuxu6J8%2BNArRbU1dv6VjNkBxOM1CVPbOE3YWZn8n%2BE%2FfreMpB5fC2vq2LRsUArmdnZR37yyqAncpHixsV4O4evHa13AWTpzQliAIUIlVF3HrxMLGdStIsNjikg%2FggsoGe%2FderE"
    //     },
    //     "langId": "en_US"//,
    //     //"browserId": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
    //   }
    // }
    // return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson)//, {headers: header})
    //   .map((response: Response) => {
    //     return response.json();
    //   })
    //   .catch((error: any) => Observable.throw('Server error'));
  }

  imeiOrderFlow(imeiNumber) {

    return this.http.get('../assets/content/imei-orderflow-response.json');

    // let requestJson = {
    //   "orderFlowRequestDO": {
    //     "attCustomer": false,
    //     "military": false,
    //     "currentFlow": "IMEI_VERIFICATION_FLOW",
    //     "ctn": "",
    //     "imei": imeiNumber,
    //     "reCaptcha": {

    //     }//,
    //     //"browserId": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
    //   }
    // };
    // return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson)//, {headers: header})
    //   .map((response: Response) => {
    //     return response.json();
    //   })
    //   .catch((error: any) => Observable.throw('Server error'));
  }

  validateEmail(domain) {
    let requestJson = {
      unlockValidateEmailRequest: {
        domain: domain
      }
    };

    return this.http.post(this.baseUrl + this.validateEmailUrl, requestJson)//, {headers: header})
  }

   confirmation() {
     return this.http.get('../assets/content/confirmation.json');
  }

  imeiMakeModelResponse(imeiNumber) {
     return this.http.get('../assets/content/imei-make-model-response.json');

  }

  verifyCaptcha(token) {

    let header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('secret', '6LekkTsUAAAAAH9lNKlOePHpepDrgaepEX-TurtI');
    urlSearchParams.append('response', token);
    let body = urlSearchParams.toString();
   
    return this.http.post("https://www.google.com/recaptcha/api/siteverify", body, {headers:header});
  }
}
