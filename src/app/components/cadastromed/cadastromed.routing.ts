import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastromedComponent } from './cadastromed.component';

export const CadastromedRoutesNames = {
  CADASTROMED: 'cadastromed',
};

const CADASTROMED_ROUTES: Routes = [
  { path: '', component: CadastromedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(CADASTROMED_ROUTES)],
  exports: [RouterModule]
})

export class CadastromedRoutingModule { }
