import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {LoginPageComponent} from "./login-page.component";

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {
}
