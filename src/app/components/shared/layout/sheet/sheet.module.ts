
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../modules';
import { SHEET_COMPONENT, SHEET_ENTRY_COMPONENT, SHEET_SERVICE } from './';

@NgModule({
  entryComponents: [
    SHEET_ENTRY_COMPONENT
  ],
  declarations: [SHEET_COMPONENT],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SHEET_COMPONENT],
  providers: [SHEET_SERVICE]
})

export class SheetModule { }
