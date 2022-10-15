import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot
} from '@angular/router';

import { ConfigService } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private configService: ConfigService) {
  }
  public canActivate(route_snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.configService.setBreadcrumb(state);
    // this.router.navigate(['/'], { skipLocationChange: true });
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChildService implements CanActivateChild {

  constructor(private router: Router, private configService: ConfigService) {
  }
  public canActivateChild(route_snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.configService.setBreadcrumb(state);
    // this.router.navigate(['/'], { skipLocationChange: true });
    return true;
  }
}
