import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppState } from '../common/services/app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'unlock-canvas',
  templateUrl: 'unlock-canvas.component.html',
  styleUrls: ['unlock-canvas.component.scss']
})
export class UnlockCanvasComponent implements OnInit {
  public unlockCanvas: any;

  constructor(private appState: AppState) {}

  public ngOnInit() {
    this.unlockCanvas = this.appState.get('unlockDevice');
  }
}
