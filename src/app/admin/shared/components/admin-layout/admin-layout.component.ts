import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  // inject rout for nav
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault() // cancel def
    this.router.navigate(['/admin', 'login'])
   }
}
