import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'account-information',
  templateUrl: 'account-information.component.html',
  styleUrls: ['account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  // @Input()
  private subscription: ISubscription;
  public cms;
  wirelessNumber;
  isInvalid: boolean = true;

  firstName = undefined;
  lastName = undefined;
  passcode = undefined;
  email = undefined;
  confirmEmail = undefined;

  mulitaryPersonnel: boolean = true;

  accFirstNameValidErr: boolean = false;
  accLastNameValidErr: boolean = false;
  emailValidErr: boolean = false;
  confirmEmailValidErr: boolean = false;
  passcodeValidErr: boolean = false;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription = this.unlockService
      .UnlockDevice()
      .subscribe((data: any) => {
        this.cms = data;
      });
    // console.log("nav1 data");
    //this.unlockService.UnlockDevice().subscribe((data: any) => {
     // this.cms = data.unlockPortalLabelAndErrorObj[0];
    //});

    this.wirelessNumber = this.route.snapshot.params['wirelessNumber'];
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public modalClosed(e) {}

  public unlockNext() {
    // var domain = this.email.slice((this.email.indexOf('@')) + 1, this.email.emailAddress.lastIndexOf('.'));
    // this.unlockService.validateEmail(domain)
    //   .subscribe((data: any) => {
    //     console.log(data);

    //     this.router.navigate(['/unlockstep3']);
    //   },
    //   (error) => {
    //     console.log(error);
    //   });

    this.router.navigate(['/unlockstep3']);
  }

  public unlockPrevious() {
    // alert("navigate");
    this.router.navigate(['/device-unlock']);
  }

  public onMilitaryPersonnelChange(value: boolean) {
    // console.log(value);
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

    if (this.passcode !== undefined && this.passcode.length === 0) {
      this.passcodeValidErr = true;
    } else {
      this.passcodeValidErr = false;
    }

    if (this.firstName !== undefined && this.lastName !== undefined && this.confirmEmail !== undefined && this.email !== undefined && this.passcode !== undefined && this.firstName.length !== 0 && this.lastName.length !== 0 &&
      this.passcode.length !== 0 && this.email.length !== 0 &&
      this.confirmEmail.length !== 0 && (this.email === this.confirmEmail)) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
}
