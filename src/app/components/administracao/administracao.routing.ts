import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministracaoComponent } from './administracao.component';

export const AdministracaoRoutesNames = {
  ADMINISTRACAO: 'administracao',
};

const ADMINISTRACAO_ROUTES: Routes = [
  { path: '', component: AdministracaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ADMINISTRACAO_ROUTES)],
  exports: [RouterModule]
})

export class AdministracaoRoutingModule { }
