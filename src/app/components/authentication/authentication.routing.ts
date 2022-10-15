import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';

export const AuthenticationRoutesNames = {
  AUTHENTICATION: 'authentication',
};

const AUTHENTICATION_ROUTES: Routes = [
  { path: '', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES)],
  exports: [RouterModule]
})

export class AuthenticationRoutingModule { }
