
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../modules';
import { FOOTER_COMPONENT } from './';

@NgModule({
  entryComponents: [],
  declarations: [FOOTER_COMPONENT],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [FOOTER_COMPONENT],
  providers: []
})

export class FooterModule { }
