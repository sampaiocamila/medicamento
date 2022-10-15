
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared';
import { MedicamentoComponent } from './';
import { MedicamentoService } from './medicamento.service';

@NgModule({
  entryComponents: [MedicamentoComponent],
  declarations: [MedicamentoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MedicamentoComponent],
  providers: [MedicamentoService]
})

export class MedicamentoModule {
}
