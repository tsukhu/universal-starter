import { CityComponent } from './city/city.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MyMaterialModule } from './mymaterial.module';
import { CityWeatherResolverService } from './city-weather-resolver.service';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent, 
    CityComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-demo-transfer-state-app' }),
    BrowserAnimationsModule,
    MyMaterialModule,
    HttpClientModule,
    BrowserTransferStateModule,
    RouterModule.forRoot([
      {
        path: ':city', component: CityComponent, resolve: { weather: CityWeatherResolverService }
      }
    ])
  ],
  providers: [CityWeatherResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
