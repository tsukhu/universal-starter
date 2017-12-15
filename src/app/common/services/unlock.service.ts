import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppStore } from '../models/appstore.model';
import { debug } from 'util';
import 'rxjs/add/operator/take';

@Injectable()
export class UnlockService {
  public baseUrl: string = 'https://oce5bpmrl.dev.att.com/';
  public redirectOCEWorkFlowUrl: string = 'apis/deviceunlock/OCEUnlockOrder/redirectOCEWorkFlow';
  public customerOrderFlow: string = 'apis/deviceunlock/OCEUnlockOrder/orderFlow';
  public validateEmailUrl: string = 'apis/deviceunlock/UnlockUtility/Verify/ValidateEmail';
  public unlockOrderStatusUrl: string = '../assets/content/unlock-status.json';
  public csrfToken: string = null;
  public wirelessDetails: any;
  public deviceDetail = undefined;
  public servletUrl = 'apis/deviceunlock/csrfguard/JavaScriptServlet';

  constructor(private http: HttpClient, public store: Store<AppStore>) {
    // const currentStore = this.getCurrentState();
    // if (currentStore.user.csrfTokenDetails !== undefined) {
    //   this.csrfToken = currentStore.user.csrfTokenDetails.csrfToken;
    // }
    this.store.select('user').subscribe(
      (d) => {
        if (d !== undefined) {
          this.csrfToken = d.csrfTokenDetails.csrfToken;
          this.wirelessDetails = d.wirelessDetails;
        }
      }
    );
  }

  public setHeader() {
    return this.http.get(this.baseUrl + this.servletUrl, { responseType: 'text' });
  }

  public orderFlow(customerNumber) {
    // return this.http.get('../assets/content/orderflow-response.json');
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: true,
        currentFlow: 'ACCOUNT_DETAILS_FLOW',
        ctn: customerNumber,
        langId: 'en_US',
        reCaptcha: {
          token: '03AO6mBfxOk5zQ2uxhvByEaA5HPabk6h_GAjdJHluALzi5Ope5sgDqOSu4D5KAIWKlNXxbl_lFV5aeMtledxVo2_6m6ftJQFZnLKGm7NtpTijSWn0ETPxxCafF3-dY0s_A7-1v3zUqxXOkhVfHz2xClraCsn5vxU602ShqdTbGCIoSliSI_jj77sN4nmmzSBaXV9oI4DQKxU6W7MOE51rVaG5QEw_v1gauiyDRjgz6GA5mJ5EwlmCDuUtiA6tNv-vOhyOluuoUTCOdojjsAd2vHlOTimTuHuh-DU3dHAht-_xF7TjXSTcyluLkj1DVXYPU5nFdt6pOqTvd',
          tokenRefId: 'A6ZoBacIR1hd39581YRaipqXPyIzsCs%2Fk5yRU%2B%2BHBIrdhqRIVZub2n%2F4Mqz9fDNiCQWDG%2Fb3xQKhfRf4o93bbI74joMSiP6e6rV2vo0QScdjKB%2FwiWKeF5mtmsT3ymz46QQrn74JAbCNZJczdBr55mXvahOOOon93ce1IbMjgiApv5bWE7pgSepwnj6QyQU7OrEncLhGXde5sCVRVDJt89s856LDbY%2FgPElMRKHp1re3ZAoMYIAjY9ybU88a6bvBoKjVWgk7EOjc2CIyZBozwd1VXubVJL9gRGPr1J0dV0h0JzHWrJUGc%2FzWS3vbve%2FEfFUg6287IGXSLJQCriuFFsUKc6p9oVMfEl2ahMcw1pY%2FL47JKVSgn8YPiDTqXeo0dgpmUgjBESpV3GO6AKBC7EntLk2GLdlFoyiDb7y0rKRZbaSg4ZNzbB2i%2BESBbT2gYRfThdYjebWmsUWdOn%2FTaf09UADBHfu18mWksxFqGmKtB1vWmKRuYBm2YbKOo9%2Bh'
        }
      }
    };
    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public userValidateOrderFlow(userdata) {
    // return this.http.get('../assets/content/orderflow-response.json');
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: true,
        currentFlow: 'USER_INFORMATION_VALIDATION_FLOW',
        ctn: userdata.wirelessnumber,
        firstName: userdata.firstname,
        lastName: userdata.lastname,
        email: userdata.email,
        langId: 'en_US',
        reCaptcha: {},
        accountType: 'IRU',
        cruCustomer: false,
        passCode: userdata.passcode
      }
    };
    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public imeiOrderFlow(imeiNumber) {
    // return this.http.get('../assets/content/imei-orderflow-response.json');
    const imeiDetails = this.wirelessDetails;
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: false,
        currentFlow: 'NON_ATT_ORDER_VALIDATION_FLOW',
        imei: imeiNumber,
        make: imeiDetails.make,
        model: imeiDetails.model,
        imeiRefId: imeiDetails.imeiRefId,
        makeRefId: imeiDetails.makeRefId,
        modelRefId: imeiDetails.modelRefId,
        reCaptcha: {},
        langId: 'en_US'// ,
      }
    };
    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public imeiOrderFlowSubmit(fName, lName, eMail) {
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: false,
        currentFlow: 'ORDER_SUBMISSION_FLOW',
        firstName: fName,
        lastName: lName,
        email: eMail,
        imei: this.deviceDetail.imeiNumber,
        make: this.deviceDetail.make,
        model: this.deviceDetail.model,
        imeiRefId: this.deviceDetail.imeiRefId,
        makeRefId: this.deviceDetail.makeRefId,
        modelRefId: this.deviceDetail.modelRefId,
        lastFourSSN: '',
        passCode: '',
        military: false,
        reCaptcha: {},
        langId: 'en_US'// ,
      }
    };

    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public validateEmail(domain) {
    const requestJson = {
      unlockValidateEmailRequest: {
        domain
      }
    };

    return this.http.post(this.baseUrl + this.validateEmailUrl, requestJson);
    // , {headers: header})
  }

  public confirmation() {
    return this.http.get('../assets/content/confirmation.json');
  }

  public imeiMakeModelResponse(imeiNumber) {
    // return this.http.get('../assets/content/imei-make-model-response.json');
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: false,
        military: false,
        currentFlow: 'IMEI_VERIFICATION_FLOW',
        ctn: '',
        imei: imeiNumber,
        reCaptcha: {}
      }
    };

    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public imeiVerificationFlow(imeiNumber, ctnnumber) {
    // return this.http.get('../assets/content/imei-make-model-response.json');
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: true,
        military: false,
        currentFlow: 'IMEI_VERIFICATION_FLOW',
        ctn: ctnnumber,
        imei: imeiNumber,
        reCaptcha: {}
      }
    };

    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public unlockOrderStatus() {
    return this.http.get(this.unlockOrderStatusUrl, {}); // , {headers: header})
  }

  public verifyCaptcha(token) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append(
      'secret',
      '6LekkTsUAAAAAH9lNKlOePHpepDrgaepEX-TurtI'
    );
    urlSearchParams.append('response', token);
    const body = urlSearchParams.toString();

    return this.http.post(
      'https://www.google.com/recaptcha/api/siteverify',
      body,
      { headers: header }
    );
  }

  public getCurrentState(): AppStore {
    let state: AppStore;
    this.store.take(1).subscribe((s) => {
      state = s;
    });
    return state;
  }

  private getHeader() {
    const header: HttpHeaders = new HttpHeaders({
      'OWASP-CSRFTOKEN': this.csrfToken
    });
    return header;
  }

}
