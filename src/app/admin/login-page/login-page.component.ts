import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // private var
  form: FormGroup
  submitted = false



  // import service
  constructor(
    private auth: AuthService, // для авторизации
    private router: Router, // для редиректа
  ) {
  }

  ngOnInit(): void {
    //
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
    })
  }
}
