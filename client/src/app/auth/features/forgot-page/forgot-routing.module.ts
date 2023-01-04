import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {ForgotPageComponent} from "./forgot-page.component";

const routes: Routes = [
  {
    path: '',
    component: ForgotPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ForgotRoutingModule {
}
