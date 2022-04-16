import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {

  constructor(private updates: SwUpdate, private snackBar: MatSnackBar) { }

  public init() {
    this.updates.versionUpdates.subscribe(event => {
      switch (event.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version:
          ${event.version.hash}`);
          break;
        case 'VERSION_READY':
          let snack = this.snackBar.open("New Update is ready ", 'Update');
          snack.onAction().subscribe(() => {
            this.updates.activateUpdate().then(() =>
              document.location.reload())
          });
          break;
      }
    });
  }
}
