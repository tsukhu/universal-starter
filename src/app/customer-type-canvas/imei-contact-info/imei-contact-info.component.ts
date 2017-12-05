import { UnlockService } from "../../common/services/unlock.service";
import { Component, OnInit, Input } from "@angular/core";
import { ModalService } from "../../common/modal/index";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "imei-contact-info",
  templateUrl: "./imei-contact-info.component.html",
  styleUrls: ["./imei-contact-info.component.scss"]
})
export class ImeiContactInfoComponent implements OnInit {
  // @Input()
  public cms;
  isInvalid: boolean = true;

  firstName = undefined;
  lastName = undefined;
  wirelessNumber = undefined;
  email = undefined;
  confirmEmail = undefined;

  wirelessNumberValidErr: boolean = false;
  firstNameValidErr: boolean = false;
  lastNameValidErr: boolean = false;
  emailValidErr: boolean = false;
  confirmEmailValidErr: boolean = false;

  constructor(
    public modalService: ModalService,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log("nav1 data");
    this.unlockService.UnlockDevice().subscribe((data: any) => {
      this.cms = data.unlockPortalLabelAndErrorObj[0];
    });
  }

  ngOnInit() {}

  modalClosed(e) {}

  unlockNext() {
    // var domain = this.email.slice((this.email.indexOf('@')) + 1, this.email.emailAddress.lastIndexOf('.'));
    // this.unlockService.validateEmail(domain)
    //   .subscribe((data: any) => {
    //     console.log(data);

    //     this.router.navigate(['/unlockstep3']);
    //   },
    //   (error) => {
    //     console.log(error);
    //   });

    this.router.navigate(["/unlockConfirm/", {customerType: false}]);
  }

  unlockPrevious() {
    // alert("navigate");
    this.router.navigate(["/device-unlock"]);
  }

  validateNext(event) {
    if(this.firstName != undefined && this.firstName.length == 0) {
      this.firstNameValidErr = true;
    } else {
      this.firstNameValidErr = false;
    }

    if(this.lastName != undefined && this.lastName.length == 0) {
      this.lastNameValidErr = true;
    } else {
      this.lastNameValidErr = false;
    }

    if(this.email != undefined && this.email.length == 0) {
      this.emailValidErr = true;
    } else {
      this.emailValidErr = false;
    }

    if(this.confirmEmail != undefined && this.confirmEmail.length == 0) {
      this.confirmEmailValidErr = true;
    } else {
      this.confirmEmailValidErr = false;
    }

    if(this.wirelessNumber != undefined && this.wirelessNumber.length == 0) {
      this.wirelessNumberValidErr = true;
    } else {
      this.wirelessNumberValidErr = false;
    }

    // console.log("hai" + this.passcode + "hello");
    if(this.firstName != undefined && this.firstName.length != 0 &&
      this.firstName != undefined && this.lastName.length != 0 &&
      this.lastName != undefined && this.wirelessNumber.length != 0 &&
      this.email != undefined && this.email.length != 0 &&
      this.confirmEmail != undefined && this.confirmEmail.length != 0 && (this.email == this.confirmEmail)) {
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
}
