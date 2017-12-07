import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ModalService } from '../common/modal/modal.service';

@Component({
  selector: 'unlock-status',
  templateUrl: 'unlock-status.component.html',
  styleUrls: ['unlock-status.component.scss']
})
export class UnlockStatusComponent implements OnInit {
  public unlockCanvas: any;

  constructor(public modalService: ModalService) {}

  public ngOnInit() {
    /** TODO */
  }

  public modalClosed(e) {
    /** TODO */
  }
}
