import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { CityWeather } from '../city-weather-resolver.service';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import { AppState } from '../common/services/app.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent implements OnInit {

  weather: Observable<CityWeather>;

  constructor(private route: ActivatedRoute, private meta: Meta, private title: Title , public appState: AppState) { }

  ngOnInit() {
    
    this.weather = this.route.data.pluck('weather').map((weather: CityWeather) => {
      this.appState.set('city', weather.name);
      this.title.setTitle(weather.name + ' weather');
      this.meta.updateTag({
        name: 'description',
        content: 'The weather in ' + weather.name
      });
      return weather;
    });
  }
}
