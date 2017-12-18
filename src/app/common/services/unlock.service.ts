import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppStore } from '../models/appstore.model';
import { debug } from 'util';
import 'rxjs/add/operator/take';

@Injectable()
export class UnlockService {
  // public baseUrl: string = 'https://oce5bpmrl.dev.att.com/';
  public baseUrl: string = 'http://zld03310.vci.att.com:8082/';
  public redirectOCEWorkFlowUrl: string = 'apis/deviceunlock/OCEUnlockOrder/redirectOCEWorkFlow';
  public customerOrderFlow: string = 'apis/deviceunlock/OCEUnlockOrder/orderFlow';
  public validateEmailUrl: string = 'apis/deviceunlock/UnlockUtility/Verify/ValidateEmail';
  public unlockOrderStatusUrl: string = '../assets/content/unlock-status.json';
  public csrfToken: string = null;
  public wirelessDetails: any;
  public customerAccountDetails: any;
  public imeiContactDetails: any;
  public deviceDetail = undefined;
  public servletUrl = 'apis/deviceunlock/csrfguard/JavaScriptServlet';

  constructor(private http: HttpClient, public store: Store<AppStore>) {
    this.store.select('user').subscribe(
      (d) => {
        if (d !== undefined) {
          if (d.csrfTokenDetails !== undefined) {
            this.csrfToken = d.csrfTokenDetails.csrfToken;
          }
          this.wirelessDetails = d.wirelessDetails;
          this.customerAccountDetails = d.customerAccountDetails;
          this.imeiContactDetails = d.imeiContactDetails;
        }
      }
    );
  }

  public setHeader() {
    return this.http.get(this.baseUrl + this.servletUrl, { responseType: 'text' });
  }

  /* ACCOUNT_DETAILS_FLOW - ATT WIRELESS NUMBER CALL STEP1 */
  public orderFlow(customerNumber) {
    // return this.http.get('../assets/content/orderflow-response.json');
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: true,
        currentFlow: 'ACCOUNT_DETAILS_FLOW',
        ctn: customerNumber,
        langId: 'en_US',
        reCaptcha: {}
      }
    };
    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  /* USER_INFORMATION_VALIDATION_FLOW - ATT WIRELESS NUMBER ACCOUNT INFORMATION CALL STEP2 */
  public userValidateOrderFlow(custAccDetails) {
    // return this.http.get('../assets/content/orderflow-response.json');
    const requestJson = {
      orderFlowRequestDO: {
        attCustomer: true,
        currentFlow: 'USER_INFORMATION_VALIDATION_FLOW',
        military: custAccDetails.mulitaryPersonnel,
        ctn: custAccDetails.wirelessNumber,
        firstName: custAccDetails.firstName,
        lastName: custAccDetails.lastName,
        email: custAccDetails.email,
        langId: 'en_US',
        reCaptcha: {},
        accountType: 'IRU',
        cruCustomer: false,
        passCode: custAccDetails.passCode
      }
    };
    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  /* IMEI_VERIFICATION_FLOW USED FOR BOTH CUSTOMER TYPE */
  public imeiMakeModelResponse(imeiNumber) {
    // return this.http.get('../assets/content/imei-make-model-response.json');
    let requestJson;
    const accDetails = (this.wirelessDetails) ? this.wirelessDetails : undefined;
    const custAccDetails = (this.customerAccountDetails) ? this.customerAccountDetails : undefined;
    if (accDetails !== undefined && custAccDetails !== undefined) {
      requestJson = {
        orderFlowRequestDO: {
          currentFlow: 'IMEI_VERIFICATION_FLOW',
          imei: imeiNumber,
          reCaptcha: {},
          langId: 'en_US',
          attCustomer: (accDetails || accDetails.customerType) ? accDetails.customerType : false,
          military:
          (custAccDetails || custAccDetails.mulitaryPersonnel)
            ? custAccDetails.mulitaryPersonnel : false,
          ctn: (accDetails.wirelessNumber) ? accDetails.wirelessNumber : ''
        }
      };
    } else {
      requestJson = {
        orderFlowRequestDO: {
          currentFlow: 'IMEI_VERIFICATION_FLOW',
          imei: imeiNumber,
          reCaptcha: {},
          attCustomer: false,
          military: false,
          ctn: '',
          langId: 'en_US'
        }
      };
    }
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
        langId: 'en_US'
      }
    };
    return this.http.post(this.baseUrl + this.customerOrderFlow, requestJson,
      { headers: this.getHeader() });
  }

  public imeiOrderFlowSubmit() {
    let requestJson;
    const accDetails = this.wirelessDetails;
    if (accDetails.customerType !== undefined && accDetails.customerType === true) {
      const accountInfoDetails = this.customerAccountDetails;
      requestJson = {
        orderFlowRequestDO: {
          attCustomer: (accDetails.customerType) ? accDetails.customerType : false,
          military: (accountInfoDetails.mulitaryPersonnel) ?
            accountInfoDetails.mulitaryPersonnel : false,
          currentFlow: 'ORDER_SUBMISSION_FLOW',
          ctn: accDetails.wirelessNumber,
          firstName: accountInfoDetails.firstName,
          lastName: accountInfoDetails.lastName,
          email: accountInfoDetails.email,
          imei: accDetails.imeiNumber,
          make: accDetails.make,
          model: accDetails.model,
          imeiRefId: accDetails.imeiRefId,
          makeRefId: accDetails.makeRefId,
          modelRefId: accDetails.modelRefId,
          lastFourSSN: '',
          passCode: accountInfoDetails.passCode,
          reCaptcha: {},
          langId: 'en_US'
        }
      };
    } else {
      const imeiContactDetails = this.imeiContactDetails;
      requestJson = {
        orderFlowRequestDO: {
          attCustomer: (accDetails.customerType) ? accDetails.customerType : false,
          military: false,
          currentFlow: 'ORDER_SUBMISSION_FLOW',
          ctn: imeiContactDetails.wirelessNumber,
          firstName: imeiContactDetails.firstName,
          lastName: imeiContactDetails.lastName,
          email: imeiContactDetails.email,
          imei: accDetails.imeiNumber,
          make: accDetails.make,
          model: accDetails.model,
          imeiRefId: accDetails.imeiRefId,
          makeRefId: accDetails.makeRefId,
          modelRefId: accDetails.modelRefId,
          lastFourSSN: '',
          passCode: '',
          reCaptcha: {},
          langId: 'en_US'
        }
      };
    }
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
