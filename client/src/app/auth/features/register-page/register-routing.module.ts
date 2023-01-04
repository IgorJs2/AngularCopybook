import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {RegisterPageComponent} from "./register-page.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegisterRoutingModule {
}
