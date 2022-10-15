
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../shared';
import { AdministracaoInfoComponent } from './';

@NgModule({
  entryComponents: [AdministracaoInfoComponent],
  declarations: [AdministracaoInfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [AdministracaoInfoComponent],
  providers: []
})

export class AdministracaoInfoModule {
}
