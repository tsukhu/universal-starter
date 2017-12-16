export interface WirelessDetails {
  wirelessNumber?: string;
  customerType?: boolean;
  imeiNumber?: string;
  make?: string;
  model?: string;
  imeiRefId?: string;
  makeRefId?: string;
  modelRefId?: string;
}

export interface CustomerAccountDetails {
  firstName?: string;
  lastName?: string;
  wirelessNumber?: string;
  email?: string;
  mulitaryPersonnel?: boolean;
  passCode?: string;
}

export interface ImeiContactDetails {
  firstName?: string;
  lastName?: string;
  wirelessNumber?: string;
  email?: string;
}

export interface CsrfTokenDetails {
  csrfToken?: string;
}

export interface User {
  wirelessDetails?: WirelessDetails;
  customerAccountDetails?: CustomerAccountDetails;
  imeiContactDetails?: ImeiContactDetails;
  csrfTokenDetails?: CsrfTokenDetails;
  requestNumber?: string;
}
