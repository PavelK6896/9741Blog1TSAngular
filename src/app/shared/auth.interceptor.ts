import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

//обработка ошибок
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //добовляем токен
    if(this.auth.isAuthenticated()){
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })

    }
    return next.handle(req).pipe(

      tap(() => {
        console.log("AuthInterceptor")
      }),


      catchError((error: HttpErrorResponse ) => {
      console.log("AuthInterceptor:", error)
      if(error.status === 401){ // если не авторизован
        this.auth.logout()
        this.router.navigate(['/admin','login'], {
          queryParams: {
            authFailed: true
          }
        })
      }
      return throwError(error)
    }))
  }


}
