import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MedicamentoModule } from '../../medicamento/medicamento.module';
import { PacienteMedicoModule } from '../../paciente-medico/paciente-medico.module';
import { ResponsavelModule } from '../../responsavel/responsavel.module';
import { MaterialModule } from '../../shared';
import { AdministracaoFormComponent } from './administracao-form.component';

@NgModule({
  entryComponents: [],
  declarations: [
    AdministracaoFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResponsavelModule,
    MedicamentoModule,
    PacienteMedicoModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    AdministracaoFormComponent
  ],
  providers: [
  ]
})

export class AdministracaoFormModule { }
