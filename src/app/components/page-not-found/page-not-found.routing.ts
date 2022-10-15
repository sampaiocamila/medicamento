import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

const PAGE_NOT_FOUND_ROUTES: Routes = [
  { path: '', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PAGE_NOT_FOUND_ROUTES)],
  exports: [RouterModule]
})

export class PageNotFoundRoutingModule { }
