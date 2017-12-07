import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { UnlockService } from '../../common/services/unlock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit,OnDestroy {
  public cms;
  private subscription: ISubscription;
  requestNo: string =  undefined;
  public cust;
  customerType: boolean;

  constructor(public modalService: ModalService, private unlockService: UnlockService,
    private router: Router, private route: ActivatedRoute) {
      this.cust = this.route.snapshot.params['customerType'];
      if(this.cust == 'true') {
        this.customerType = true;
      } else {
        this.customerType = false;
      }
     }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this.unlockService
      .UnlockDevice()
      .subscribe((data: any) => {
        this.cms = data;
      });

    this.unlockService.confirmation().subscribe((data: any) => {
      // this.requestNo = "ABC";
      this.requestNo = data.orderFlowResponseDO.requestNo;
    });
  }
}
