import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrescricaoComponent } from './prescricao.component';

export const PrescricaoRoutesNames = {
  PRESCRICAO: 'prescricao',
};

const PRESCRICAO_ROUTES: Routes = [
  { path: '', component: PrescricaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PRESCRICAO_ROUTES)],
  exports: [RouterModule]
})


export class PrescricaoRoutingModule { }
