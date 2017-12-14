import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInformationComponent {
  // @Input()

  public cms: Observable<UnlockData>;
  public wirelessNumber;
  public isInvalid: boolean = true;
  public elementFocused;
  // public firstName = undefined;
  // public lastName = undefined;
  // public passcode = undefined;
  // public email = undefined;
  // public confirmEmail = undefined;

  public mulitaryPersonnel: boolean = true;

  public accFirstNameValidErr: boolean = false;
  public accLastNameValidErr: boolean = false;
  public emailValidErr: boolean = false;
  public confirmEmailValidErr: boolean = false;
  public passcodeValidErr: boolean = false;
  accountInfoForm: FormGroup;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppStore>
  ) {
    this.cms = store.select('cms');
    
    this.wirelessNumber = this.route.snapshot.params['wirelessNumber'];

    this.accountInfoForm = fb.group({
        firstName : ['', Validators.compose([Validators.required, Validators.maxLength(35)])],
        lastName : ['', Validators.compose([Validators.required, Validators.maxLength(35)])],
        passcode : ['', Validators.compose([Validators.required])],
        email : ['', Validators.compose([Validators.required, Validators.email])],
        confirmEmail : ['', Validators.compose([Validators.required, Validators.email])],
        validate : ''
      });
  }

  get firstName() {
     return this.accountInfoForm.get('firstName');
  }
  get lastName() {
     return this.accountInfoForm.get('lastName');
  }

  get passcode() {
     return this.accountInfoForm.get('passcode');
  }
  get email() {
     return this.accountInfoForm.get('email');
  }

  get confirmEmail() {
     return this.accountInfoForm.get('confirmEmail');
  }

  public unlockNext() {

    this.router.navigate(['/unlockstep3']);
  }

  public unlockPrevious() {
    this.router.navigate(['/device-unlock']);
  }

  public onMilitaryPersonnelChange(value: boolean) {
    this.mulitaryPersonnel = value;
  }

  // public validateNext(event) {
  //   if (this.firstName !== undefined && this.firstName.length === 0) {
  //     this.accFirstNameValidErr = true;
  //   } else {
  //     this.accFirstNameValidErr = false;
  //   }

  //   if (this.lastName !== undefined && this.lastName.length === 0) {
  //     this.accLastNameValidErr = true;
  //   } else {
  //     this.accLastNameValidErr = false;
  //   }

  //   if (this.email !== undefined && this.email.length === 0) {
  //     this.emailValidErr = true;
  //   } else {
  //     this.emailValidErr = false;
  //   }

  //   if (this.confirmEmail !== undefined && this.confirmEmail.length === 0) {
  //     this.confirmEmailValidErr = true;
  //   } else {
  //     this.confirmEmailValidErr = false;
  //   }

  //   if (this.passcode !== undefined && this.passcode.length === 0) {
  //     this.passcodeValidErr = true;
  //   } else {
  //     this.passcodeValidErr = false;
  //   }

  //   if (
  //     this.firstName !== undefined &&
  //     this.lastName !== undefined &&
  //     this.confirmEmail !== undefined &&
  //     this.email !== undefined &&
  //     this.passcode !== undefined &&
  //     this.firstName.length !== 0 &&
  //     this.lastName.length !== 0 &&
  //     this.passcode.length !== 0 &&
  //     this.email.length !== 0 &&
  //     this.confirmEmail.length !== 0 &&
  //     this.email === this.confirmEmail
  //   ) {
  //     this.isInvalid = false;
  //   } else {
  //     this.isInvalid = true;
  //   }
  // }
}
