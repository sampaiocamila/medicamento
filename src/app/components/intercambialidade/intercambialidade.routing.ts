import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntercambialidadeComponent } from './intercambialidade.component';

export const IntercambialidadeRoutesNames = {
  INTERCAMBIALIDADE: 'intercambialidade',
};

const INTERCAMBIALIDADE_ROUTES: Routes = [
  { path: '', component: IntercambialidadeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(INTERCAMBIALIDADE_ROUTES)],
  exports: [RouterModule]
})

export class IntercambialidadeRoutingModule { }
