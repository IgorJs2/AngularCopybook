import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {NoAuthGuard} from "../../../core/services/auth/no-auth-guard.service";
import {ClassDisconnectRoutingModule} from "../class-disconnect-page/class-disconnect-routing.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../class-page/class-page.module').then(m => m.ClassPageModule),
  },
  {
    path: 'connect-class',
    loadChildren: () => import('../class-connect-page/class-connect-page.module').then(m => m.ClassConnectPageModule),
  },
  {
    path: 'del-class',
    loadChildren: () => import('../class-disconnect-page/class-disconnect-page.module').then(m => m.ClassDisconnectPageModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClassShellRoutingModule {
}
