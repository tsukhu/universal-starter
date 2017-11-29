import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UnlockService } from "../common/services/unlock.service";

@Component({
  selector: 'unlock-canvas',
  templateUrl: 'unlock-canvas.component.html',
  styleUrls: ['unlock-canvas.component.scss']
})
export class UnlockCanvasComponent implements OnInit {
  unlockCanvas: any;

  constructor(private unlockService: UnlockService) { 
  }

  ngOnInit() {
      this.unlockService.UnlockDevice().subscribe(
        (data: any) => {
          this.unlockCanvas = data.unlockPortalLabelAndErrorObj[0];
        }
      )
       
  }

}
