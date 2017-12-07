import { UnlockService } from '../../common/services/unlock.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'imei-contact-info',
  templateUrl: './imei-contact-info.component.html',
  styleUrls: ['./imei-contact-info.component.scss']
})
export class ImeiContactInfoComponent implements OnInit, OnDestroy {
  // @Input()
  public cms;
  public isInvalid: boolean = true;

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

  private subscription: ISubscription;
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
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public ngOnInit() {}

  public modalClosed(e) {}

  public unlockNext() {
    // var domain = this.email.slice((this.email.indexOf('@')) + 1, 
    // this.email.emailAddress.lastIndexOf('.'));
    // this.unlockService.validateEmail(domain)
    //   .subscribe((data: any) => {
    //     console.log(data);

    //     this.router.navigate(['/unlockstep3']);
    //   },
    //   (error) => {
    //     console.log(error);
    //   });

    this.router.navigate(['/unlockConfirm/', { customerType: false }]);
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
