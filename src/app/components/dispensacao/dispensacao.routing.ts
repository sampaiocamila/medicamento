import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DispensacaoComponent } from './dispensacao.component';

export const DispensacaoRoutesNames = {
  DISPENSACAO: 'dispensacao',
};

const DISPENSACAO_ROUTES: Routes = [
  { path: '', component: DispensacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(DISPENSACAO_ROUTES)],
  exports: [RouterModule]
})

export class DispensacaoRoutingModule { }
