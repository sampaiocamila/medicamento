import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from '../shared';
import { ElementListModule } from '../shared/layout/element-list/element-list.module';
import { SheetModule } from '../shared/layout/sheet/sheet.module';
import { NotificacaoComponent } from './notificacao.component';
import { NotificacaoRoutingModule } from './notificacao.routing';
import { NotificacaoFormModule } from './notificaccao-form/notificacao-form.module';

@NgModule({
  entryComponents: [NotificacaoComponent],
  declarations: [
    NotificacaoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NotificacaoFormModule,
    ElementListModule,
    SheetModule,
    MaterialModule,
    CommonModule,
    NotificacaoRoutingModule,
  ],
  providers: []
})

export class NotificacaoModule { }
