
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../modules';
import { TOOLBAR_HEADER_COMPONENT } from './';

@NgModule({
  entryComponents: [],
  declarations: [TOOLBAR_HEADER_COMPONENT],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [TOOLBAR_HEADER_COMPONENT],
  providers: []
})

export class ToolbarHeaderModule { }
