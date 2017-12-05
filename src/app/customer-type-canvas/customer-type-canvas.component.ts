import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UnlockService } from '../common/services/unlock.service';
import { ModalService } from '../common/modal/modal.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'customer-type-canvas',
  templateUrl: 'customer-type-canvas.component.html',
  styleUrls: ['customer-type-canvas.component.scss']
})
export class CustomerTypeCanvasComponent implements OnInit {
  unlockCanvas: Observable<any>;

  constructor(private unlockService: UnlockService, public modalService: ModalService) {
  }

  ngOnInit() {
    this.unlockCanvas = this.unlockService.UnlockDevice();
       
  }

  public modalClosed(e) {
  }

}
