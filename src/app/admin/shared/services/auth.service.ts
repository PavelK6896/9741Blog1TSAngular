import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  // возвращает стрим ани
  login(user: User): Observable<any> {
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      //получаем дату экс в милисекундах
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
      console.log(response)
    } else {
      localStorage.clear()
    }
  }
}
