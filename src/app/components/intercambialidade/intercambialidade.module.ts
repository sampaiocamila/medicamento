import { BiologicosService } from './../shared/services/biologicos.service';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { LayoutModule, MaterialModule } from '../shared';
import { ElementListModule } from '../shared/layout/element-list/element-list.module';
import { SheetModule } from '../shared/layout/sheet/sheet.module';
import { IntercambialidadeComponent } from './intercambialidade.component';
import { IntercambialidadeRoutingModule } from './intercambialidade.routing';
import { IntercambialidadeInfoModule } from './intercambialidade-info/intercambialidade-info.module';

@NgModule({
  entryComponents: [],
  declarations: [IntercambialidadeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ElementListModule,
    SheetModule,
    MaterialModule,
    LayoutModule,
    CommonModule,
    IntercambialidadeRoutingModule,
    IntercambialidadeInfoModule
  ],
  exports: [IntercambialidadeComponent],
  providers: [BiologicosService]
})

export class IntercambialidadeModule { }
