import { BiologicosService } from '../../shared/services/biologicos.service';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { LayoutModule, MaterialModule } from '../../shared';
import { ElementListModule } from '../../shared/layout/element-list/element-list.module';
import { SheetModule } from '../../shared/layout/sheet/sheet.module';
import { RastreabilidadeDialogComponent } from './rastreabilidade-dialog.component';

@NgModule({
  entryComponents: [RastreabilidadeDialogComponent],
  declarations: [RastreabilidadeDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ElementListModule,
    SheetModule,
    MaterialModule,
    LayoutModule,
    CommonModule,
  ],
  exports: [RastreabilidadeDialogComponent],
  providers: [BiologicosService]
})

export class RastreabilidadeDialogModule { }
