import { ActionReducer, Action } from '@ngrx/store';
import {
  WirelessDetails,
  CustomerAccountDetails,
  ImeiContactDetails,
  CsrfTokenDetails
} from '../models/steps.model';

export class WirelessDetailsAction implements Action {
  public type = 'ADD_WIRELESS_DETAILS';

  constructor(public payload: WirelessDetails) { }
}

// tslint:disable-next-line:max-classes-per-file
export class CustomerAccountDetailsAction implements Action {
  public type = 'ADD_CUSTOMER_DETAILS';

  constructor(public payload: CustomerAccountDetails) { }
}

// tslint:disable-next-line:max-classes-per-file
export class ImeiContactDetailsAction implements Action {
  public type = 'ADD_IMEI_DETAILS';

  constructor(public payload: ImeiContactDetails) { }
}

export class AddRequestNumberAction implements Action {
  public type = 'ADD_REQUEST_NUMBER';

  constructor(public payload: string) { }
}

export class CsrfTokenDetailsAction implements Action {
  public type = 'ADD_CSRF_TOKEN';

  constructor(public payload: CsrfTokenDetails) { }
}

// tslint:disable-next-line:max-classes-per-file
export class ResetUserAction implements Action {
  public type = 'RESET_USER';
}
