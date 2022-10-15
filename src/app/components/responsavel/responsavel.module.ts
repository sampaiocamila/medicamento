
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';

import { MaterialModule } from '../shared';
import { ResponsavelComponent } from './';

@NgModule({
  entryComponents: [ResponsavelComponent],
  declarations: [ResponsavelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule],
  exports: [ResponsavelComponent],
  providers: []
})

export class ResponsavelModule {
}
