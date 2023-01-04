import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {ClassDisconnectPageComponent} from "./class-disconnect-page.component";

const routes: Routes = [
  {
    path: '',
    component: ClassDisconnectPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClassDisconnectRoutingModule {
}
