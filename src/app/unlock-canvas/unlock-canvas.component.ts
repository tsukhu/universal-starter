import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'unlock-canvas',
  templateUrl: 'unlock-canvas.component.html',
  styleUrls: ['unlock-canvas.component.scss']
})
export class UnlockCanvasComponent implements OnInit {
  unlockCanvas: any;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.http.get('../assets/content/unlockCanvas.json')
      .subscribe(data => {
        this.unlockCanvas =  data;
      });
  }

}
