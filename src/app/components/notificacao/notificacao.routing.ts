import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificacaoComponent } from './notificacao.component';

export const NotificacaoRoutesNames = {
  NOTIFICACAO: 'notificacao',
};

const NOTIFICACAO_ROUTES: Routes = [
  { path: '', component: NotificacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(NOTIFICACAO_ROUTES)],
  exports: [RouterModule]
})

export class NotificacaoRoutingModule { }
