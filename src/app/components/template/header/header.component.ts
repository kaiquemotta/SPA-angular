import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';
import { HeaderService } from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get titulo(): string {
    return this.headerService.headerData.titulo
  }

  get icone(): string {
    return this.headerService.headerData.icone
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
