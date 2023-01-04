import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {ClassPageComponent} from "./class-page.component";
import {ClassConnectRoutingModule} from "../class-connect-page/class-connect-routing.module";
import {ClassDisconnectRoutingModule} from "../class-disconnect-page/class-disconnect-routing.module";

const routes: Routes = [
  {
    path: '',
    component: ClassPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClassRoutingModule {
}
