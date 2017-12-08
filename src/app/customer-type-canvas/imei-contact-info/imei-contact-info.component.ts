import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from '../../common/models/appstore.model';
import { UnlockData, ActionCart } from '../../common/models/unlock.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'imei-contact-info',
  templateUrl: './imei-contact-info.component.html',
  styleUrls: ['./imei-contact-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImeiContactInfoComponent {
  // @Input()
  public cms: Observable<UnlockData>;
  public isInvalid: boolean = true;
  public deviceDetail: any;
  public firstName = undefined;
  public lastName = undefined;
  public wirelessNumber = undefined;
  public email = undefined;
  public confirmEmail = undefined;

  public wirelessNumberValidErr: boolean = false;
  public firstNameValidErr: boolean = false;
  public lastNameValidErr: boolean = false;
  public emailValidErr: boolean = false;
  public confirmEmailValidErr: boolean = false;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>) {
      this.cms = store.select('cms');
    }

  public unlockNext() {
    this.unlockService.imeiOrderFlowSubmit(this.firstName, this.lastName, this.email).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/unlockConfirm/', { customerType: false }]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public unlockPrevious() {
    // alert("navigate");
    this.router.navigate(['/device-unlock']);
  }

  public validateNext(event) {
    if (this.firstName !== undefined && this.firstName.length === 0) {
      this.firstNameValidErr = true;
    } else {
      this.firstNameValidErr = false;
    }

    if (this.lastName !== undefined && this.lastName.length === 0) {
      this.lastNameValidErr = true;
    } else {
      this.lastNameValidErr = false;
    }

    if (this.email !== undefined && this.email.length === 0) {
      this.emailValidErr = true;
    } else {
      this.emailValidErr = false;
    }

    if (this.confirmEmail !== undefined && this.confirmEmail.length === 0) {
      this.confirmEmailValidErr = true;
    } else {
      this.confirmEmailValidErr = false;
    }

    if (this.wirelessNumber !== undefined && this.wirelessNumber.length === 0) {
      this.wirelessNumberValidErr = true;
    } else {
      this.wirelessNumberValidErr = false;
    }

    if (
      this.firstName !== undefined &&
      this.firstName.length !== 0 &&
      this.lastName !== undefined &&
      this.lastName.length !== 0 &&
      this.wirelessNumber !== undefined &&
      this.wirelessNumber.length !== 0 &&
      this.email !== undefined &&
      this.email.length !== 0 &&
      this.confirmEmail !== undefined &&
      this.confirmEmail.length !== 0 &&
      this.email === this.confirmEmail
    ) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
}
