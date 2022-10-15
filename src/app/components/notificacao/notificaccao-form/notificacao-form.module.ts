import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import {
  AdministracaoInfoModule
} from '../../administracao/administracao-info/administracao-info.module';
import { MedicamentoModule } from '../../medicamento/medicamento.module';
import { PacienteMedicoModule } from '../../paciente-medico/paciente-medico.module';
import { ResponsavelModule } from '../../responsavel/responsavel.module';
import { MaterialModule } from '../../shared';
import { NotificacaoFormComponent } from './notificacao-form.component';

@NgModule({
  entryComponents: [],
  declarations: [
    NotificacaoFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResponsavelModule,
    MedicamentoModule,
    PacienteMedicoModule,
    AdministracaoInfoModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    NotificacaoFormComponent
  ],
  providers: [
  ]
})

export class NotificacaoFormModule { }
