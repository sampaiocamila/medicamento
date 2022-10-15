import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MedicamentoModule } from '../medicamento/medicamento.module';
import { LayoutModule, MaterialModule } from '../shared';
import { ElementListModule } from '../shared/layout/element-list/element-list.module';
import { SheetModule } from '../shared/layout/sheet/sheet.module';
import { DispensacaoFormModule } from './dispensacao-form/dispensacao-form.module';
import { DispensacaoComponent } from './dispensacao.component';
import { DispensacaoRoutingModule } from './dispensacao.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    DispensacaoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MedicamentoModule,
    DispensacaoFormModule,
    ElementListModule,
    SheetModule,
    MaterialModule,
    LayoutModule,
    CommonModule,
    DispensacaoRoutingModule,
  ],
  providers: []
})

export class DispensacaoModule { }
