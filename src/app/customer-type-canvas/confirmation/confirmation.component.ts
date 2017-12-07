import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal/index';
import { UnlockService } from '../../common/services/unlock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../common/services/app.service';

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public cms;
  public requestNo: string = undefined;
  public cust;
  public customerType: boolean;

  constructor(
    public modalService: ModalService,
    private appState: AppState,
    private unlockService: UnlockService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cust = this.route.snapshot.params['customerType'];
    if (this.cust === 'true') {
      this.customerType = true;
    } else {
      this.customerType = false;
    }
  }

  public ngOnInit() {
    this.cms = this.appState.get('unlockDevice');

    this.unlockService.confirmation().subscribe((data: any) => {
      // this.requestNo = "ABC";
      this.requestNo = data.orderFlowResponseDO.requestNo;
    });
  }
}
