import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ModalService } from "../../common/modal/index";
import { UnlockStatusService } from "../../common/services/unlock-status.service";
import { ActivatedRoute } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: "unlock-status-confirmation",
  templateUrl: "unlock-status-confirmation.component.html",
  styleUrls: ["unlock-status-confirmation.component.scss"]
})
export class UnlockStatusConfirmationComponent implements OnInit, OnDestroy {
  @Input() public cms;

  public orderStatus: any;
  public imeiNumber;
  private subscriptionUnlock: ISubscription;
  private subscriptionOrder: ISubscription;

  constructor(
    public modalService: ModalService,
    private unlockStatusService: UnlockStatusService,
    private route: ActivatedRoute
  ) {
    this.imeiNumber = this.route.snapshot.params["imeiNumber"];
  }

  ngOnInit() {
    this.subscriptionUnlock = this.unlockStatusService
      .UnlockDevice()
      .subscribe((data: any) => {
        this.cms = data.unlockPortalLabelAndErrorObj[0];
      });
    this.subscriptionOrder = this.unlockStatusService
      .unlockOrderStatus()
      .subscribe((data: any) => {
        this.orderStatus = data.oceUnlockOrderStatusDO;
      });
  }

  ngOnDestroy() {
    if (this.subscriptionUnlock) {
      this.subscriptionUnlock.unsubscribe();
    }
    if (this.subscriptionOrder) {
      this.subscriptionOrder.unsubscribe();
    }
  }
}
