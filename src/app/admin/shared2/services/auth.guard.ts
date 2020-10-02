import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {//Охрана

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {


    if (this.auth.isAuthenticated()) {
      return true // авторизован
    } else {
      this.auth.logout()
      this.router.navigate(['/admin', 'login'], {
        // info param
        queryParams: {
          loginAgain: true
        }
      })
    }

  }

}
