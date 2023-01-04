import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {map, take} from 'rxjs/operators';
import {AuthService} from "./auth-service.service";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const user = this.authService.userValue;

    if (!user) {
      return true;
    }

    this.router.navigate(['/class'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}
