import { Component, OnInit } from '@angular/core';
import { LogUpdateService } from './services/log-update.service';
import { ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, interval, concat } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'S_Rani_MyFavouriteBooks';
  constructor(private logService: LogUpdateService, private appRef: ApplicationRef, private updates: SwUpdate) { }

  ngOnInit(): void {
    this.logService.init();
    // Poll for updates with half hours
    const appIsStable$ = this.appRef.isStable.pipe(
      first(isStable => isStable === true));
    const everyHalfHours$ = interval(1800 *
      1000);
    const everyHalfHoursOnceAppIsStable$ =
      concat(appIsStable$, everyHalfHours$);
    everyHalfHoursOnceAppIsStable$.subscribe(
      () => this.updates.checkForUpdate());
  }

}
