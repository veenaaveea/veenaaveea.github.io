import {Component, OnInit} from '@angular/core';
import {NavBarCustomisationService} from "../../services/nav-bar-customisation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public navBarService: NavBarCustomisationService
  ) { }

  ngOnInit(): void {
    this.navBarService.fixedTop = true;
  }
}
