import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthGuardChildService } from './components/shared/services/auth-guard.service';


export const AppRoutesNames = {
  AUTHENTICATION: 'authentication',
  HOME: 'home',
  ADMINISTRACAO: 'administracao',
  NOTIFICACAO: 'notificacao',
  CADASTROMED: 'cadastromed',
  DISPENSACAO: 'dispensacao',
  INTERCAMBIALIDADE: 'intercambialidade',
  PRESCRICAO: 'prescricao',
  RASTREABILIDADE: 'rastreabilidade'
};

const APP_ROUTES_PROD: Routes = [
  { path: '', redirectTo: `/${AppRoutesNames.HOME}`, pathMatch: 'full' },
  {
    path: AppRoutesNames.PRESCRICAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/prescricao/prescricao.module#PrescricaoModule'
  },
  {
    path: AppRoutesNames.HOME,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/home/home.module#HomeModule'
  },
  {
    path: AppRoutesNames.ADMINISTRACAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/administracao/administracao.module#AdministracaoModule'
  },
  {
    path: AppRoutesNames.NOTIFICACAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/notificacao/notificacao.module#NotificacaoModule'
  },
  {
    path: AppRoutesNames.CADASTROMED,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/cadastromed/cadastromed.module#CadastromedModule'
  },
  {
    path: AppRoutesNames.DISPENSACAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/dispensacao/dispensacao.module#DispensacaoModule'
  },
  {
    path: AppRoutesNames.INTERCAMBIALIDADE,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/intercambialidade/intercambialidade.module#IntercambialidadeModule'
  },
  {
    path: AppRoutesNames.RASTREABILIDADE,
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/rastreabilidade/rastreabilidade.module#RastreabilidadeModule'
  },

  {
    path: AppRoutesNames.AUTHENTICATION,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: '**',
    canActivateChild: [AuthGuardChildService],
    loadChildren: 'src/app/components/page-not-found/page-not-found.module#PageNotFoundModule'
  }
];


const APP_ROUTES_DEV: Routes = [
  { path: '', redirectTo: `/${AppRoutesNames.HOME}`, pathMatch: 'full' },
  {
    path: AppRoutesNames.HOME,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: AppRoutesNames.PRESCRICAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/prescricao/prescricao.module').then(mod => mod.PrescricaoModule)
  },
  {
    path: AppRoutesNames.DISPENSACAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/dispensacao/dispensacao.module').then(mod => mod.DispensacaoModule)
  },
  {
    path: AppRoutesNames.ADMINISTRACAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/administracao/administracao.module').then(mod => mod.AdministracaoModule)
  },
  {
    path: AppRoutesNames.NOTIFICACAO,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/notificacao/notificacao.module').then(mod => mod.NotificacaoModule)
  },
  {
    path: AppRoutesNames.CADASTROMED,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/cadastromed/cadastromed.module').then(mod => mod.CadastromedModule)
  },
  {
    path: AppRoutesNames.INTERCAMBIALIDADE,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/intercambialidade/intercambialidade.module').then(mod => mod.IntercambialidadeModule)
  },
  {
    path: AppRoutesNames.RASTREABILIDADE,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/rastreabilidade/rastreabilidade.module').then(mod => mod.RastreabilidadeModule)
  },
  {
    path: AppRoutesNames.AUTHENTICATION,
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: '**',
    canActivateChild: [AuthGuardChildService],
    loadChildren: () => import('./components/page-not-found/page-not-found.module').then(mod => mod.PageNotFoundModule),
  }
];

const APP_ROUTES = environment.production ? APP_ROUTES_PROD : APP_ROUTES_DEV;
@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES,
      { enableTracing: false, useHash: true }
    )
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.APP_BASE_HREF }],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

    // data: { preload: true, delay: false }
    // , preloadingStrategy: AppPreloadingStrategy
