import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {ClassConnectPageComponent} from "./class-connect-page.component";

const routes: Routes = [
  {
    path: '',
    component: ClassConnectPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClassConnectRoutingModule {
}
