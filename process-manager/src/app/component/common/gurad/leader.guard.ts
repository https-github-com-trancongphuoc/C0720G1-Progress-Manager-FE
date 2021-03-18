import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "../../account/storage.service";

@Injectable({
  providedIn: 'root'
})
export class LeaderGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const account = this.storageService.getUser();
    if (account == null) {
      this.router.navigateByUrl('');
      return false;
    } else {
      for (let i = 0; i< account.accountRoleList.length; i++) {
        if (account.accountRoleList[i].role.name == 'ROLE_LEADER') {
          return true;
        }
      }
      this.router.navigateByUrl('');
      return false;
    }
  }

}
