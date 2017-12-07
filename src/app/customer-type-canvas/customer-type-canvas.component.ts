import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UnlockService } from '../common/services/unlock.service';
import { ModalService } from '../common/modal/modal.service';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../common/services/app.service';

@Component({
  selector: 'customer-type-canvas',
  templateUrl: 'customer-type-canvas.component.html',
  styleUrls: ['customer-type-canvas.component.scss']
})
export class CustomerTypeCanvasComponent implements OnInit {
  public unlockCanvas: any;

  constructor(
    private unlockService: UnlockService,
    private appState: AppState,
    public modalService: ModalService
  ) {}

  public ngOnInit() {
    this.unlockCanvas = this.appState.get('unlockDevice');
  }

  public modalClosed(e) {}
}
