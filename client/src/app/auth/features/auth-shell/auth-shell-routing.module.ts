import {Injectable, NgModule} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router'
import {NoAuthGuard} from "../../../core/services/auth/no-auth-guard.service";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('../register-page/register-page.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'forgot',
    loadChildren: () => import('../forgot-page/forgot-page.module').then(m => m.ForgotPageModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthShellRoutingModule {
}
