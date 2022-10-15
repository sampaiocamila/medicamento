import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntercambialidadeDialogModule } from '../intercambialidade/intercambialidade-dialog/intercambialidade-dialog.module';
import { RastreabilidadeDialogModule } from '../rastreabilidade/rastreabilidade-dialog/rastreabilidade-dialog.module';

import { ResponsavelModule } from '../responsavel/responsavel.module';
import { MaterialModule } from '../shared';
import { PacienteMedicoComponent } from './';

@NgModule({
  entryComponents: [PacienteMedicoComponent],
  declarations: [PacienteMedicoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResponsavelModule,
    CommonModule, MaterialModule,
    RouterModule,
    IntercambialidadeDialogModule,
    RastreabilidadeDialogModule
    ],
  exports: [PacienteMedicoComponent],
  providers: []
})

export class PacienteMedicoModule {
}
