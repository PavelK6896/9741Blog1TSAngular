import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // private var
  form: FormGroup
  submitted = false
  message: string



  // import service
  constructor(
    public auth: AuthService, // для авторизации
    private router: Router, // для редиректа
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: Params)=>{
      // проверям инфо по ключю
      if(param['loginAgain']){
        this.message = 'Пожалуйста, ввойдите'
      }


    })


    this.form = new FormGroup(
      {
        email: new FormControl(null,
          [
            Validators.required,
            Validators.email
          ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6)
        ])
      }
    )
  }

  submit() {
    // right valid
    if (this.form.invalid) {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true // для получения времени жизни
    }

    // ограничить множественный запрос
    this.submitted = true

    //метод подписка
    this.auth.login(user).subscribe(() => {
      this.form.reset() // очистить
      this.router.navigate(['/admin', 'dashboard']) // перейти
      this.submitted = false
    }, error => {
      // если ошибка то разблокировать кнопку
      this.submitted = false
    })
  }
}
