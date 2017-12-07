/* import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppState } from './common/services/app.service';
import { TransferState } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
class MockRouter {
  public navigate(url: string) {
    return url;
  }
}


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ AppState, TransferState,
                  { provide: Router, useClass: MockRouter },
                  NavigationStart ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
 */