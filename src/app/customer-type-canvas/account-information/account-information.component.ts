import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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

  public firstName = undefined;
  public lastName = undefined;
  public passcode = undefined;
  public email = undefined;
  public confirmEmail = undefined;

  public mulitaryPersonnel: boolean = true;

  public accFirstNameValidErr: boolean = false;
  public accLastNameValidErr: boolean = false;
  public emailValidErr: boolean = false;
  public confirmEmailValidErr: boolean = false;
  public passcodeValidErr: boolean = false;
  public invalidEmailFormatErr: boolean = false;
  public invalidConfirmEmailFormatErr: boolean = false;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>
  ) {
    this.cms = store.select('cms');
    this.wirelessNumber = this.route.snapshot.params['wirelessNumber'];
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

  public validateNext(event) {
    if (this.firstName !== undefined && this.firstName.length === 0) {
      this.accFirstNameValidErr = true;
    } else {
      this.accFirstNameValidErr = false;
    }

    if (this.lastName !== undefined && this.lastName.length === 0) {
      this.accLastNameValidErr = true;
    } else {
      this.accLastNameValidErr = false;
    }

    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    if (this.email !== undefined && this.email.length === 0) {
      this.invalidEmailFormatErr = false;
      this.emailValidErr = true;
    } else {
      if (this.email !== undefined && this.email.length !== 0 && !emailPattern.test(this.email)) {
        this.invalidEmailFormatErr = true;
        this.emailValidErr = false;
      } else {
        this.invalidEmailFormatErr = false;
        this.emailValidErr = false;
      }
    }

    if (this.confirmEmail !== undefined && this.confirmEmail.length === 0 ) {
      this.confirmEmailValidErr = true;
      this.invalidConfirmEmailFormatErr = false;
    } else {
      if (this.confirmEmail !== undefined && this.confirmEmail.length !== 0 ) {
       if (!emailPattern.test(this.confirmEmail) && this.email != this.confirmEmail) {
        this.invalidConfirmEmailFormatErr = true;
        this.confirmEmailValidErr = false;
       } else if (this.email != this.confirmEmail) {
        this.invalidConfirmEmailFormatErr = false;
        this.confirmEmailValidErr = true;
       } else {
          this.invalidConfirmEmailFormatErr = false;
          this.confirmEmailValidErr = false;
       }
      } else {
        this.invalidConfirmEmailFormatErr = false;
        this.confirmEmailValidErr = false;
      }
    }

    if (this.passcode !== undefined && this.passcode.length === 0) {
      this.passcodeValidErr = true;
    } else {
      this.passcodeValidErr = false;
    }

    if (
      this.firstName !== undefined &&
      this.lastName !== undefined &&
      this.confirmEmail !== undefined &&
      this.email !== undefined &&
      this.passcode !== undefined &&
      this.firstName.length !== 0 &&
      this.lastName.length !== 0 &&
      this.passcode.length !== 0 &&
      this.email.length !== 0 &&
      this.confirmEmail.length !== 0 &&
      this.email === this.confirmEmail
    ) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
}
