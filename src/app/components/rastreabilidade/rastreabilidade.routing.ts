import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RastreabilidadeComponent } from './rastreabilidade.component';

export const RastreabilidadeRoutesNames = {
  RASTREABILIDADE: 'rastreabilidade',
};

const RASTREABILIDADE_ROUTES: Routes = [
  { path: '', component: RastreabilidadeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(RASTREABILIDADE_ROUTES)],
  exports: [RouterModule]
})

export class RastreabilidadeRoutingModule { }
