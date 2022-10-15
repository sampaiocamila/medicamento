import { ParticlesModule } from 'ngx-particle';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MaterialModule } from '../shared';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    AuthenticationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    AuthenticationRoutingModule,
    ParticlesModule,
    MaterialModule,
    CommonModule,
  ],
  providers: []
})

export class AuthenticationModule { }
