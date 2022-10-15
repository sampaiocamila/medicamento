import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MedicamentoModule } from '../medicamento/medicamento.module';
import { PacienteMedicoModule } from '../paciente-medico/paciente-medico.module';
import { MaterialModule } from '../shared';
import { PrescricaoComponent } from './prescricao.component';
import { PrescricaoRoutingModule } from './prescricao.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    PrescricaoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MedicamentoModule,
    PacienteMedicoModule,
    MaterialModule,
    CommonModule,
    PrescricaoRoutingModule,
  ],
  providers: []
})


export class PrescricaoModule { }
