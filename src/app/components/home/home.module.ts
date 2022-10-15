import { ParticlesModule } from 'ngx-particle';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    HomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    HomeRoutingModule,
    ParticlesModule,
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  exports: [HomeComponent],
  providers: []
})

export class HomeModule { }
