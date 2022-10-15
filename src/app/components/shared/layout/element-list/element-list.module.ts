import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MaterialModule } from '../../modules';
import { ELEMENT_LIST_COMPONENT } from './';

@NgModule({
  entryComponents: [],
  declarations: [ELEMENT_LIST_COMPONENT],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule],
  exports: [ELEMENT_LIST_COMPONENT],
  providers: []
})

export class ElementListModule { }
