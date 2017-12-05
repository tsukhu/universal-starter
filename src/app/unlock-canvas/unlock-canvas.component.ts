import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UnlockService } from "../common/services/unlock.service";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'unlock-canvas',
  templateUrl: 'unlock-canvas.component.html',
  styleUrls: ['unlock-canvas.component.scss']
})
export class UnlockCanvasComponent implements OnInit {
  unlockCanvas: Observable<any>;

  constructor(private unlockService: UnlockService) { 
  }

  ngOnInit() {
      this.unlockCanvas = this.unlockService.UnlockDevice();       
  }

}
