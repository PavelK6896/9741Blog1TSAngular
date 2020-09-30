import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


// laze load module for admin
@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule, // add all module
    //
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([ // child module for route
      {
        //display and page on
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},//1
          {path: 'login', component: LoginPageComponent},//1
          {path: 'dashboard', component: DashboardPageComponent},//2
          {path: 'create', component: CreatePageComponent},//3
          {path: 'post/:id/edit', component: EditPageComponent}//4
        ]
      }
    ])
  ],
  exports: [RouterModule] // экспортируем модули
})
export class AdminModule {

}
