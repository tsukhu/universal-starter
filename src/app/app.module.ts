import { CityComponent } from './city/city.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityWeatherResolverService } from './city-weather-resolver.service';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './common/layout.module';
import { AppState } from './common/services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-demo-transfer-state-app' }),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserTransferStateModule,
    LayoutModule,
    RouterModule.forRoot([
      {
        path: 'city/:city', component: CityComponent, resolve: { weather: CityWeatherResolverService }
      },
      { path: '', redirectTo: 'unlock-canvas', pathMatch: 'full' },
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' },
      { path: 'unlock-canvas', loadChildren: './unlock-canvas/unlock-canvas.module#UnlockCanvasModule' },
      { path: 'device-unlock', loadChildren: './customer-type-canvas/customer-type-canvas.module#CustomerTypeCanvasModule' },
      { path: 'unlock-status', loadChildren: './unlock-status/unlock-status.module#UnlockStatusModule' },      
    ])
  ],
  providers: [
    CityWeatherResolverService,
    AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
