import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MaterialModule } from '../shared';
import { CadastromedComponent } from './cadastromed.component';
import { CadastromedRoutingModule } from './cadastromed.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    CadastromedComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MaterialModule,
    CommonModule,
    CadastromedRoutingModule,
  ],
  providers: []
})

export class CadastromedModule { }
