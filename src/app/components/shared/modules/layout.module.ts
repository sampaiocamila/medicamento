import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DisableControlDirective, HighlightDirective, MaskPhoneDirective } from '../directive';
import { MaterialModule } from './material.module';

@NgModule({
  entryComponents: [
  ],
  declarations: [
    DisableControlDirective,
    MaskPhoneDirective,
    HighlightDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    DisableControlDirective,
    MaskPhoneDirective,
    HighlightDirective
  ],
  providers: [
  ]
})
export class LayoutModule { }
