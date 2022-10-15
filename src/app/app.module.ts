import { ParticlesModule } from 'ngx-particle';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MaterialModule } from './components/shared';
import { FooterModule } from './components/shared/layout/footer/footer.module';
import { SheetModule } from './components/shared/layout/sheet/sheet.module';
import { SidnavHeaderModule } from './components/shared/layout/sidenav-menu/sidenav-menu.module';
import {
  ToolbarHeaderModule
} from './components/shared/layout/toolbar-header/toolbar-header.module';
import { ServiceModule } from './components/shared/services/services.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    // HttpClientXsrfModule.withOptions({ cookieName: 'My-Xsrf-Cookie', headerName: 'My-Xsrf-Header' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    ServiceModule,
    ParticlesModule,
    RouterModule,
    SidnavHeaderModule,
    ToolbarHeaderModule,
    FooterModule,
    SheetModule
  ],
  providers: [
    // AppPreloadingStrategy
    // RequestCache,
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
