import { BiologicosService } from './biologicos.service';
import { NgModule } from '@angular/core';

import { ConfigService } from '../config';
import { AlertService } from './alert.service';
import { AuthGuardChildService, AuthGuardService } from './auth-guard.service';
import { GeolocationService } from './geolocation.service';
import { LogService } from './log.service';
import { MessageService } from './message.service';
import { MockService } from './mock.service';
import { SheetService } from './sheet.service';
import { SpeechRecognitionService } from './speech-recognition.service';
import { StyleService } from './style.service';
import { WindowService } from './window.service';

@NgModule({
  entryComponents: [],
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AlertService,
    AuthGuardService,
    AuthGuardChildService,
    GeolocationService,
    LogService,
    MessageService,
    MockService,
    StyleService,
    WindowService,
    ConfigService,
    SheetService,
    SpeechRecognitionService,
    BiologicosService
  ]
})
export class ServiceModule { }
