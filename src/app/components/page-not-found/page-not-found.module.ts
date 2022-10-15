import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    PageNotFoundComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    PageNotFoundRoutingModule,
    RouterModule
  ],
  providers: []
})

export class PageNotFoundModule { }
