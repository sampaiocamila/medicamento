
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../shared';
import { IntercambialidadeInfoComponent } from '.';
import { AdministracaoInfoModule } from '../../administracao/administracao-info/administracao-info.module';
import { MedicamentoModule } from '../../medicamento/medicamento.module';
import { PacienteMedicoModule } from '../../paciente-medico/paciente-medico.module';
import { ResponsavelModule } from '../../responsavel/responsavel.module';

@NgModule({
  entryComponents: [],
  declarations: [
    IntercambialidadeInfoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResponsavelModule,
    MedicamentoModule,
    PacienteMedicoModule,
    AdministracaoInfoModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    IntercambialidadeInfoComponent
  ],
  providers: []
})

export class IntercambialidadeInfoModule {
}
