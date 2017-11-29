import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppState } from '../common/services/app.service';
import { UnlockCanvasComponent } from "./unlock-canvas.component";
import { UnlockPanelComponent } from "./unlock-panel/unlock-panel.component";
import { UnlockActionPanelComponent } from "./unlock-action-panel/unlock-action-panel.component";
import { CommonModule } from "@angular/common";
import { UnlockActionCardComponent } from "./unlock-action-panel/unlock-action-card/index";

@NgModule({
  declarations: [UnlockCanvasComponent, UnlockPanelComponent, UnlockActionPanelComponent, UnlockActionCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UnlockCanvasComponent, pathMatch: 'full' }
    ])
  ]
})
export class UnlockCanvasModule {

}