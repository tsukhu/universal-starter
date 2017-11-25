import { NgModule, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppState } from '../common/services/app.service';

@Component({
  selector: 'lazy-view',
  template: `<h3>i'm lazy</h3>`
})
export class LazyComponent {

  public constructor(public appState: AppState) {
    this.appState.set('Current Route', 'Lazy Component');
  }


}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full' }
    ])
  ]
})
export class LazyModule {

}