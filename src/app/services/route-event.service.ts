import {Injectable} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class RouteEventService {
  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) {
    router.events
      .subscribe((event) => {
        const isLoading = [
          NavigationStart.name
        ].indexOf(event.constructor.name) > -1;

        const isLoaded = [
          NavigationCancel.name,
          NavigationEnd.name,
          NavigationError.name
        ].indexOf(event.constructor.name) > -1;

        if (isLoading) {
          loaderService.loading();
        } else if (isLoaded) {
          loaderService.loaded();
        }
      });
  }
}
