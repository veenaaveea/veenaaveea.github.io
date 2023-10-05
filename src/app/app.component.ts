import { Component } from '@angular/core';
import {NavBarCustomisationService} from "./services/nav-bar-customisation.service";
import {AuthService} from "./services/auth.service";
import {DateTime} from "luxon";
import {RouteEventService} from "./services/route-event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Veenaavee';
  year = DateTime.now().year;

  constructor(
    public navBarService: NavBarCustomisationService,
    public authService: AuthService,
    private routeEventsService: RouteEventService
  ) { }
}
