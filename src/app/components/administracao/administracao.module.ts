import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MaterialModule } from '../shared';
import { ElementListModule } from '../shared/layout/element-list/element-list.module';
import { SheetModule } from '../shared/layout/sheet/sheet.module';
import { AdministracaoFormModule } from './administracao-form/administracao-form.module';
import { AdministracaoComponent } from './administracao.component';
import { AdministracaoRoutingModule } from './administracao.routing';

@NgModule({
  entryComponents: [],
  declarations: [
    AdministracaoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AdministracaoFormModule,
    ElementListModule,
    SheetModule,
    MaterialModule,
    CommonModule,
    AdministracaoRoutingModule,
  ],
  providers: []
})

export class AdministracaoModule { }
