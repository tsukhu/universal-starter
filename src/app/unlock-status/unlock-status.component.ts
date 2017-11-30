import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UnlockService } from '../common/services/unlock.service';
import { ModalService } from '../common/modal/modal.service';

@Component({
  selector: 'unlock-status',
  templateUrl: 'unlock-status.component.html',
  styleUrls: ['unlock-status.component.scss']
})
export class UnlockStatusComponent implements OnInit {
  unlockCanvas: any;

  constructor(private unlockService: UnlockService, public modalService: ModalService) {
  }

  ngOnInit() {
      this.unlockService.UnlockDevice().subscribe(
        (data: any) => {
          this.unlockCanvas = data.unlockPortalLabelAndErrorObj[0];
        }
      )
       
  }

  public modalClosed(e) {
  }

}
